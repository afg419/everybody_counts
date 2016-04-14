// NOTE: The contents of this file will only be executed if
// you uncomment its entry in "web/static/js/app.js".

// To use Phoenix channels, the first step is to import Socket
// and connect at the socket path in "lib/my_app/endpoint.ex":
import {Socket} from "phoenix"
let socket = new Socket("http://localhost:4000/socket", {params: {token: window.userToken}})



//
//
// let counterOutput    = $("#dom-counter");
// let counterIncrement = $("#increment-counter");
//
// counterIncrement.on("click", event => {
//   console.log("het")
//   channel.push("count_up", {body: "plus_one"});
// })
//
// channel.on("count_up", payload => {
//   if(payload.body === "EVERYTHING HAS FAILED"){
//     counterOutput.append(`<br/>[Oh.. oh no...] ${payload.body}`);
//   }else{
//     counterOutput.html(payload.body);
//   }
// });

export default socket
