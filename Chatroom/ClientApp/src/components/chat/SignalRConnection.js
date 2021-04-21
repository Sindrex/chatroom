// WebSocket = undefined;
//EventSource = undefined;
//, signalR.HttpTransportType.LongPolling

import { HubConnectionBuilder } from '@microsoft/signalr';

var connection = null;

export function SetupConnection() {
    connection = new HubConnectionBuilder()
        .withUrl("/chathub")
        .build();

    connection.start()
        .catch(err => console.error(err.toString()));
};

export function SetupMessageReciever(func){
    connection.on("RecieveMessage", (update) => {
        console.log("RecieveMessage", update);
        func(update);
    });
}

export function SendMessage(e) {
    e.preventDefault();
    const author = document.getElementById("author").value;
    const messageInput = document.getElementById("message");
    const message = messageInput.value;
    //messageInput.value = "";

    if (!author || !message) return;

    const obj = {
        Author: author,
        Message: message
    }
    console.log("Sending: ", obj);

    connection.invoke("SendChatMessage", obj);
}