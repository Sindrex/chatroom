using System;
using System.Net.WebSockets;
using System.Text;
using System.Threading;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SignalR;
using Chatroom.Hubs;
using Chatroom.Models;

namespace Chatroom.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class ChatController : Controller
    {
        private readonly IHttpContextAccessor _httpContextAccessor;
        private readonly IHubContext<ChatHub> _chatHub;

        public ChatController(IHttpContextAccessor httpContextAccessor, IHubContext<ChatHub> coffeeHub)
        {
            _httpContextAccessor = httpContextAccessor;
            _chatHub = coffeeHub;
        }

        [HttpGet]
        public async Task<IActionResult> Get()
        {
            Console.WriteLine($"ChatController: Get");
            await Task.Delay(1);
            return Accepted(1);
        }

        [HttpPost]
        [Consumes("application/json")]
        public async Task<IActionResult> SendChatMessage([FromBody] ChatMessage message)
        {
            Console.WriteLine($"ChatController: SendChatMessage: message={message}");
            //Start process for order
            //await _chatHub.Clients.All.SendAsync("NewOrder", order);
            await Task.Delay(1);
            //save order somewhere and get order id
            Console.WriteLine($"ChatController: SendChatMessage: Returning accept now!");
            return Accepted(1); //return order id 1
        }

        /*
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
        }*/
    }
}