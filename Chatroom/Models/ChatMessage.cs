using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Chatroom.Models
{
    public class ChatMessage
    {
        public string Author { get; set; }
        public string Message { get; set; }

        public override string ToString()
        {
            return $"{Author}: {Message}";
        }
    }
}
