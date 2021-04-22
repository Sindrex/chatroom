# The Chatroom
ASP.NET Core SignalR chatroom solution (for learning reasons), setup with automatic deployment to Heroku at [The Chatroom](https://shpchatroom.herokuapp.com/WiredBrain.html). Solution is built to a docker image that is pushed to Heroku.

# How it was setup
## SignalR
Based on example by Roland Guijt [here](https://github.com/RolandGuijt/GettingStartedWithSignalR/tree/SignalR3.1).

## Docker
First add docker support to your project: See [this](https://docs.microsoft.com/en-us/dotnet/architecture/containerized-lifecycle/design-develop-containerized-apps/visual-studio-tools-for-docker).

Most important part is: In the `Dockerfile` comment out `ENTRYPOINT ...` and add `CMD ASPNETCORE_URLS=http://*:$PORT dotnet <your project name>.dll`. This will configure the docker image to run on Heroku's given port.

## GitHub Actions
Configure for Heroku based on example [here](https://codeburst.io/deploy-a-containerized-asp-net-core-app-to-heroku-using-github-actions-9e54c72db943).

Go to GitHub repo > Actions > New Workflow > Setup workflow yourself > add relevant code to build docker and push to heroku (see this project's [main.yml](https://github.com/Sindrex/chatroom/blob/main/.github/workflows/main.yml) for example).

Add your Heroku API key (found in Account Settings) to the repo's secret keys by going to GitHub repo > Settings > Secrets > New Repository Secret.

## Heroku
Create new [Heroku](https://dashboard.heroku.com/) App with a sensible name.

## React
For client, React was used.
