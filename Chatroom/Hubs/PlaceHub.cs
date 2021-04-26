using System;
using System.Threading;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.SignalR;
using Chatroom.Models;
using Chatroom.Helpers;

namespace Chatroom.Hubs
{
    public class PlaceHub : Hub<IPlaceClient>
    {
        private readonly IState _state;

        public PlaceHub(IState state)
        {
            _state = state;
        }

        public async Task SendColorMessage(ColorMessage message)
        {
            Console.WriteLine($"PlaceHub: SendColorMessage: message={message}");
            var colorArr = _state.GetState();
            colorArr[message.x][message.y] = message.Hex;
            _state.SetState(colorArr);
            Console.WriteLine("PlaceHub: \n" + ToString(colorArr));
            await Clients.Others.RecieveColor(message);
        }

        public override async Task OnConnectedAsync()
        {
            Console.WriteLine($"PlaceHub: GetColorState");
            await Clients.Caller.RecieveColorState(_state.GetState());
        }

        private string ToString(string[][] arr)
        {
            string res = "";
            foreach(string[] innerarr in arr)
            {
                res += "row: ";
                foreach(string str in innerarr)
                {
                    res += str + ",";
                }
                res += "\n";
            }
            return res;
        }
    }
}