using System;
using System.Threading;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.SignalR;
using Chatroom.Models;

namespace Chatroom.Hubs
{
    public class ChatHub : Hub<IChatClient>
    {
        public ChatHub()
        {
        }

        public async Task SendChatMessage(ChatMessage message)
        {
            Console.WriteLine($"ChatHub: SendChatMessage: message={message}");
            //await Clients.Caller.SendAsync("ReceiveOrderUpdate", result.Update);
            await Clients.All.RecieveMessage(message);
            Console.WriteLine($"ChatHub: SendChatMessage: Finished now!");
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