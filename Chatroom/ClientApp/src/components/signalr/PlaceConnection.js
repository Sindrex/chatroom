// WebSocket = undefined;
//EventSource = undefined;
//, signalR.HttpTransportType.LongPolling

import { HubConnectionBuilder } from '@microsoft/signalr';

var connection = null;

export function SetupPlaceConnection() {
    connection = new HubConnectionBuilder()
        .withUrl("/placehub")
        .withAutomaticReconnect()
        .build();

    connection.start()
        .catch(err => console.error(err.toString()));
};

export function SetupColorStateReciever(func) {
    connection.on("RecieveColorState", (update) => {
        console.log("RecieveColorState", update);
        func(update);
    });
}

export function SetupColorReciever(func){
    connection.on("RecieveColor", (update) => {
        console.log("RecieveColor", update);
        func(update);
    });
}

export function SendColorMessage(hex, x, y) {
    if (!hex) return;

    const obj = {
        Hex: hex,
        X: x,
        Y: y
    }
    console.log("Sending: ", obj);

    connection.invoke("SendColorMessage", obj);
}