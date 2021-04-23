# The Chatroom
ASP.NET Core SignalR chatroom solution (for learning reasons), setup with automatic deployment to Heroku at [The Chatroom](https://shpchatroom.herokuapp.com/). Solution is built to a docker image that is pushed to Heroku.

# How it was setup
## SignalR
Based on example by Roland Guijt [here](https://github.com/RolandGuijt/GettingStartedWithSignalR/tree/SignalR3.1).

### Client: JS
`@microsoft/signalr: ^5.0.5` was added to dependencies in `package.json`.

This starts the signalR connection:
```
var connection = new HubConnectionBuilder()
        .withUrl("/chathub")
        .withAutomaticReconnect()
        .build();
        
connection.start()
        .catch(err => console.error(err.toString()));
```

Now call server methods by:
```
connection.invoke("SendChatMessage", obj);
```

Recieve requests from the server by:
```
connection.on("RecieveMessageHistory", (update) => {
    console.log("RecieveMessageHistory", update);
});
```

### Server: ASP.NET Core (3.1)
In ``Startup.cs`` ``ConfigureServices(IServiceCollection services)`` add to the end:
```
services.AddHttpContextAccessor(); //?
services.AddSignalR(c =>
{
    c.EnableDetailedErrors = true;
}); //.AddAzureSignalR();
```

In ``Configure(IApplicationBuilder app, IHostEnvironment env)`` add:
```
app.UseEndpoints(endpoints =>
{
    //endpoints.MapControllers();
    endpoints.MapControllerRoute(
        name: "default",
        pattern: "{controller}/{action=Index}/{id?}"
    );
    endpoints.MapHub<ChatHub>("/chathub"); //IMPORTANT PART
});
```

Now create a feature [Hub](https://github.com/Sindrex/chatroom/blob/main/Chatroom/Hubs/ChatHub.cs) to handle server-client communication.

Note that you can create [interfaces](https://github.com/Sindrex/chatroom/blob/main/Chatroom/Hubs/IChatClient.cs) to mock the client's methods, which allows for strict typing (you avoid having to name methods by strings).

## Docker
A Docker container is used to run the server on Heroku.

First add docker support to your project: See [this](https://docs.microsoft.com/en-us/dotnet/architecture/containerized-lifecycle/design-develop-containerized-apps/visual-studio-tools-for-docker).

Most important part is: In the `Dockerfile` comment out `ENTRYPOINT ...` and add `CMD ASPNETCORE_URLS=http://*:$PORT dotnet <your project name>.dll`. This will configure the docker image to run on Heroku's given port.

## GitHub Actions
GitHub Actions (CI) is used to automatically build and deploy the project to Heroku whenever the main branch is committed to.

Configure for Heroku based on example [here](https://codeburst.io/deploy-a-containerized-asp-net-core-app-to-heroku-using-github-actions-9e54c72db943).

Go to GitHub repo > Actions > New Workflow > Setup workflow yourself > add relevant code to build docker and push to heroku (see this project's [main.yml](https://github.com/Sindrex/chatroom/blob/main/.github/workflows/main.yml) for example).

Add your Heroku API key (found in Account Settings) to the repo's secret keys by going to GitHub repo > Settings > Secrets > New Repository Secret.

## Heroku
Used to host the server.

Create new [Heroku](https://dashboard.heroku.com/) App with a sensible name.

## React
React was used for clientside UI.

To do this install React.Asp with NuGet and see this project for examples. You need to initialize React in ``Startup.cs`` and for Docker you need it to install ``NPM`` when building as the React client has dependencies.

That is done by installing ``NodeJS``, which bundles with ``NPM``.
```
# install NodeJS 13.x
# see https://github.com/nodesource/distributions/blob/master/README.md#deb
RUN apt-get update -yq 
RUN apt-get install curl gnupg -yq 
RUN curl -sL https://deb.nodesource.com/setup_13.x | bash -
RUN apt-get install -y nodejs
```


