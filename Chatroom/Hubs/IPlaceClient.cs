using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Chatroom.Models;

namespace Chatroom.Hubs
{
    public interface IPlaceClient
    {
        Task RecieveColorState(string[][] colorState);
        Task RecieveColor(ColorMessage message);
    }
}
