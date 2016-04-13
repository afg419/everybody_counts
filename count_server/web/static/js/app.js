// Brunch automatically concatenates all files in your
// watched paths. Those paths can be configured at
// config.paths.watched in "brunch-config.js".
//
// However, those files will only be executed if
// explicitly imported. The only exception are files
// in vendor, which are never wrapped in imports and
// therefore are always executed.

// Import dependencies
//
// If you no longer want to use a dependency, remember
// to also remove its path from "config.paths.watched".
import "phoenix_html"

// Import local files
//
// Local files can be imported directly using relative
// paths "./socket" or full ones "web/static/js/socket".

import socket from "./socket"
// import Authorize from "web/static/js/components/_authorize"
import React from "react"
import ReactDOM from "react-dom"

var Main = React.createClass({
  getInitialState(){
    return {loggedIn: false};
  },

  login(){
    this.state.loggedIn = true;
    console.log("LOGGED THE FUCK IN")
  },

  logout(){
    this.state.loggedIn = false;
  },

  render() {
    return (
      <div>
        <h1>Ready to furiously click some buttons?!</h1>
        <Authorize login={this.login} logout={this.logout}/>
      </div>
    )
  }
})

var Authorize = React.createClass({
  createAccount(){
    let username = this.refs.username.value;
    let password = this.refs.password.value;

    $.ajax({
      url: '/api/v1/session',
      type: 'GET',
      data: {username: username, password: password},
      success: (reply) => {
        if(reply){
          this.props.login();
        }
      }
    });
  },

  loginExisting(){
    let username = this.refs.username.value;
    let password = this.refs.password.value;

    $.ajax({
      url: '/api/v1/session',
      type: 'POST',
      data: {username: username, password: password},
      success: (reply) => {
        if(reply){
          this.props.login();
        }
      }
    });
  },

  render(){
    return(
      <div>
        <input ref='username' placeholder='username' />
        <input ref='password' placeholder='password' />
        <div>  |^  </div>
        <div>  |-  </div>
        <div>  |v  </div>
        <button onClick={this.createAccount}>Create new Account</button>
        <button onClick={this.loginExisting}>Login to Pre-existing Account</button>
      </div>
    )
  }
})


ReactDOM.render(
  <Main/>, document.getElementById("main")
)
