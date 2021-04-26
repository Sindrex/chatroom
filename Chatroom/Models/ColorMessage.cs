using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Chatroom.Models
{
    public class ColorMessage
    {
        public string Hex { get; set; }
        public int x { get; set; }
        public int y { get; set; }

        public override string ToString()
        {
            return $"Color: {Hex} at ({x},{y})";
        }
    }
}
