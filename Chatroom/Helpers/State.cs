using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Chatroom.Helpers
{
    public class State : IState
    {
        string[][] colorState;
        static int width = 40;
        static int height = 40;

        public State()
        {
            colorState = new string[width][];
            for (int x = 0; x < width; x++)
            {
                colorState[x] = new string[height];
                for (int y = 0; y < height; y++)
                {
                    colorState[x][y] = "#FFFFFF";
                }
            }
        }

        public string[][] GetState()
        {
            return colorState;
        }
        public void SetState(string[][] state)
        {
            colorState = state;
        }
    }
}
