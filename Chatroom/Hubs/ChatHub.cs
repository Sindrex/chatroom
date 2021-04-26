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
            await Clients.All.RecieveMessage(message);
        }
        public async Task SendChatMessageHistory(ChatMessage[] messages, string connectionId)
        {
            var curConnectionid = Context.ConnectionId;
            Console.WriteLine($"ChatHub: SendChatMessageHistory: messages={messages}, connectionId={connectionId} from connectionid={curConnectionid}");
            if (curConnectionid == connectionId) return;

            await Clients.Client(connectionId).RecieveMessageHistory(messages);
        }
        public async Task OnEnterChat(string author)
        {
            Console.WriteLine($"ChatHub: OnEnterChat: author={author}");
            var connectionid = Context.ConnectionId;
            await Clients.All.RecieveOneConnected(new AuthorRegister
            {
                Author = author, 
                ConnectionId = connectionid
            });
        }
        public async Task SyncAuthor(string author)
        {
            Console.WriteLine($"ChatHub: SyncAuthor: author={author}");
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
            Console.WriteLine($"ChatHub: OnDisconnectedAsync: connectionid={connectionid}");
            await Clients.Others.RecieveOneDisconnected(connectionid);
        }
    }
}