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
        public async Task OnEnterChat(string author)
        {
            var connectionid = Context.ConnectionId;
            await Clients.All.RecieveOneConnected(new AuthorRegister
            {
                Author = author, 
                ConnectionId = connectionid
            });
        }
        public async Task SyncAuthors(string author)
        {
            var connectionid = Context.ConnectionId;
            await Clients.Others.RecieveOneSync(new AuthorRegister
            {
                Author = author,
                ConnectionId = connectionid
            });
        }
        /*
        public override async Task OnConnectedAsync()
        {
            var connectionid = Context.ConnectionId;
            await Clients.Client(connectionid).SendAsync
        }
        */

        public override async Task OnDisconnectedAsync(Exception exception)
        {
            var connectionid = Context.ConnectionId;
            await Clients.Others.RecieveOneDisconnected(connectionid);
        }
    }
}