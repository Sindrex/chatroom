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

export function SetupMessageHistoryReciever(func) {
    connection.on("RecieveMessageHistory", (update) => {
        console.log("RecieveMessageHistory", update);
        func(update);
    });
}

export function SetupConnectedReciever(func) {
    connection.on("RecieveOneConnected", (update) => {
        console.log("RecieveOneConnected", update);
        func(update);
    });
}

export function SetupSyncReciever(func) {
    connection.on("RecieveOneSync", (update) => {
        console.log("RecieveOneSync", update);
        func(update);
    });
}

export function SetupDisconnectedReciever(func) {
    connection.on("RecieveOneDisconnected", (update) => {
        console.log("RecieveOneDisconnected", update);
        func(update);
    });
}

export function SendMessage(author, message) {
    if (!author || !message) return;

    const obj = {
        Author: author,
        Message: message
    }
    console.log("Sending: ", obj);

    connection.invoke("SendChatMessage", obj);
}

export function OnEnterChat(author) {
    console.log("Entering chat: ", author);

    connection.invoke("OnEnterChat", author);
}

export function SyncAuthor(author) {
    console.log("SyncAuthor: ", author);

    connection.invoke("SyncAuthor", author);
}

export function SendChatMessageHistory(messageHistory, connectionId) {
    console.log("SendChatMessageHistory: ", messageHistory, connectionId);

    connection.invoke("SendChatMessageHistory", messageHistory, connectionId);
}