"use strict";
var connection = new signalR.HubConnectionBuilder().withUrl("/chatHub").build();

//Disable the send button until connection is established.
document.getElementById("sendButton").disabled = true;

connection.on("ReceiveMessage", function (mensajeUsuario) {
    var li = document.createElement("li");
    document.getElementById("messagesList").appendChild(li);
    // We can assign user-supplied strings to an element's textContent because it
    // is not interpreted as markup. If you're assigning in any other way, you 
    // should be aware of possible script injection concerns.
    li.textContent = `${mensajeUsuario.nombre} says ${mensajeUsuario.mensaje}`;
});

connection.start().then(function () {
    document.getElementById("sendButton").disabled = false;
}).catch(function (err) {
    return console.error(err.toString());
});

document.getElementById("sendButton").addEventListener("click", function (event) {
    var user = document.getElementById("userInput").value;
    var message = document.getElementById("messageInput").value;

    // Crear objeto que coincida con clsMensajeUsuario
    var mensajeUsuario = {
        nombre: user,
        mensaje: message
    };

    connection.invoke("SendMessage", mensajeUsuario).catch(function (err) {
        return console.error(err.toString());
    });
    event.preventDefault();
});