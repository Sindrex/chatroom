using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Chatroom.Models
{
    public class AuthorRegister
    {
        public string Author { get; set; }
        public string ConnectionId { get; set; }

        public override string ToString()
        {
            return $"{Author}: {ConnectionId}";
        }
    }
}
