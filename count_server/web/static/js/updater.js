import {Socket} from "phoenix"

export default function updater(renderIncrement){
  let socket = new Socket("/socket", {params: {token: window.userToken}});
  socket.connect();

  let channel = socket.channel("the_counter", {});

  channel.join()
    .receive("ok", resp => { console.log("Joined successfully get ready to increment some counters", resp) })
    .receive("error", resp => { console.log("Unable to join you are missing out on a world of fun", resp) })

  channel.onClose(event => console.log('Channel closed.'));

  channel.on("count_up", payload => {
    debugger;
    renderIncrement(payload.body)
    // if(payload.body === "EVERYTHING HAS FAILED"){
    //   counterOutput.append(`<br/>[Oh.. oh no...] ${payload.body}`);
    // }else{
    //   counterOutput.html(payload.body);
    // }
    console.log("OH DAMN")
  });

  const close = () => socket.disconnect()

  const send = () => {
    channel.push("count_up", {body: "plus_one"});
  }

  return {close: close, send: send}
}