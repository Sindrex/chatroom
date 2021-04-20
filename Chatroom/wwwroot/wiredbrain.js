// WebSocket = undefined;
//EventSource = undefined;
//, signalR.HttpTransportType.LongPolling

let connection = null;

setupConnection = () => {
    connection = new signalR.HubConnectionBuilder()
        .withUrl("/chathub")
        .build();

    connection.on("RecieveMessage", (update) => {
        console.log("RecieveMessage", update);

        let stringified = update.author + ": " + update.message;

        console.log("Stringified=", stringified);
        console.log("blah blah blah=");

        let newDiv = document.createElement("li");
        newDiv.id = 'messageItem';
        newDiv.setAttribute("id", "messageItem");
        newDiv.innerHTML = stringified;
        const currentDiv = document.getElementById("entrypoint");
        currentDiv.after(newDiv);
    }
    );

    connection.start()
        .catch(err => console.error(err.toString()));
};

setupConnection();

document.getElementById("submit").addEventListener("click", e => {
    e.preventDefault();
    const author = document.getElementById("author").value;
    const messageInput = document.getElementById("message");
    const message = messageInput.value;
    messageInput.value = "";

    const obj = {
        Author: author,
        Message: message
    }
    console.log("Sending: ", obj);


    connection.invoke("SendChatMessage", obj);
    /*
    fetch("/Chat",
        {
            method: "POST",
            body: obj,
            headers: {
                'content-type': 'application/json'
            }
        })
        .then(response => response.text())
        .then(id => {
            console.log(obj);
            connection.invoke("SendChatMessage", obj);
        });
    */
});