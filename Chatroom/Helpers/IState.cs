using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Chatroom.Helpers
{
    public interface IState
    {
        string[][] GetState();
        void SetState(string[][] state);
    }
}
