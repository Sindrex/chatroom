using System;
using System.Threading;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.SignalR;
using WiredBrain.Helpers;

namespace WiredBrain.Hubs
{
    public class CoffeeHub : Hub
    {
        private readonly OrderChecker _orderChecker;

        public CoffeeHub(OrderChecker orderChecker)
        {
            _orderChecker = orderChecker;
        }

        public async Task GetUpdateForOrder(int orderId)
        {
            CheckResult result;
            Console.WriteLine($"CoffeeHub:GetUpdateForOrder(orderId={orderId})");
            do
            {
                result = _orderChecker.GetUpdate(orderId);
                Thread.Sleep(1000);
                if (result.New)
                    await Clients.Caller.SendAsync("ReceiveOrderUpdate",
                        result.Update);
            } while (!result.Finished);
            Console.WriteLine($"CoffeeHub: Sending finished!");
            await Clients.Caller.SendAsync("Finished");
            Console.WriteLine($"CoffeeHub: Finished now!");
        }
        /*
        public override async Task OnConnectedAsync()
        {
            var connectionid = Context.ConnectionId;
            await Clients.Client(connectionid).SendAsync
        }
        */
    }
}