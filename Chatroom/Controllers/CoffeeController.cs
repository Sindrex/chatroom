﻿using System;
using System.Net.WebSockets;
using System.Text;
using System.Threading;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SignalR;
using WiredBrain.Helpers;
using WiredBrain.Hubs;
using WiredBrain.Models;

namespace WiredBrain.Controllers
{
    [Route("[controller]")]
    public class CoffeeController : Controller
    {
        private readonly OrderChecker _orderChecker;
        private readonly IHttpContextAccessor _httpContextAccessor;
        private readonly IHubContext<CoffeeHub> _coffeeHub;

        public CoffeeController(OrderChecker orderChecker, IHttpContextAccessor httpContextAccessor, IHubContext<CoffeeHub> coffeeHub)
        {
            _orderChecker = orderChecker;
            _httpContextAccessor = httpContextAccessor;
            _coffeeHub = coffeeHub;
        }

        [HttpPost]
        [Consumes("application/json")]
        public async Task<IActionResult> OrderCoffee([FromBody] Order order)
        {
            Console.WriteLine($"CoffeeController:OrderCoffee(order={order.Product},{order.Size})");
            //Start process for order
            await _coffeeHub.Clients.All.SendAsync("NewOrder", order);
            //save order somewhere and get order id
            Console.WriteLine($"CoffeeController: OrderCoffee: Returning accept now!");
            return Accepted(1); //return order id 1
        }

        [HttpGet("{orderNo}")]
        public async void GetUpdateForOrder(int orderNo)
        {
            Console.WriteLine($"CoffeeController:GetUpdateForOrder(orderNo={orderNo})");
            var context = _httpContextAccessor.HttpContext;
            if (context.WebSockets.IsWebSocketRequest)
            {
                var webSocket = await context.WebSockets.AcceptWebSocketAsync();
                await SendEvents(webSocket, orderNo);
                await webSocket.CloseAsync(WebSocketCloseStatus.NormalClosure,
                    "Done", CancellationToken.None);
            }
            else
            {
                context.Response.StatusCode = 400;
            }
        }

        private async Task SendEvents(WebSocket webSocket, int orderNo)
        {
            CheckResult result;
            Console.WriteLine($"CoffeeController:SendEvents(socket, orderNo={orderNo})");
            do
            {
                result = _orderChecker.GetUpdate(orderNo);
                Thread.Sleep(2000);

                if (!result.New) continue;

                var jsonMessage = $"\"{result.Update}\"";
                await webSocket.SendAsync(buffer: new ArraySegment<byte>(
                        array: Encoding.ASCII.GetBytes(jsonMessage),
                        offset: 0,
                        count: jsonMessage.Length),
                    messageType: WebSocketMessageType.Text,
                    endOfMessage: true,
                    cancellationToken: CancellationToken.None);
            } while (!result.Finished);
        }
    }
}