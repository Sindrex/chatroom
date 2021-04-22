using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Chatroom.Models;

namespace Chatroom.Hubs
{
    public interface IChatClient
    {
        Task RecieveMessage(ChatMessage message);
        Task RecieveOneConnected(AuthorRegister author);
        Task RecieveOneSync(AuthorRegister author);
        Task RecieveOneDisconnected(string connectionid);
    }
}
