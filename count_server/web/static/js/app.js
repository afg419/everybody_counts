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


import {Socket} from "phoenix"


var Main = React.createClass({
  getInitialState(){
    return {socket: new Socket("/socket", {params: {token: window.userToken}}), loggedIn: false, counter: parseInt($("#main")[0].className)};
  },

  login(){
    this.setState({ loggedIn: true });
    console.log("LOGGED $#%@^ IN");
  },

  logout(){
    this.setState({ loggedIn: false});
    console.log("LOGGED #$%#$ OUT");
  },

  render() {
    return (
      <div>
        <h2>{this.state.counter}</h2>
        <h1>Ready to furiously click some buttons?!</h1>
        <Game loggedIn={this.state.loggedIn} />
        <Authorize loggedIn={this.state.loggedIn} login={this.login} logout={this.logout}/>
      </div>
    );
  }
});

var Authorize = React.createClass({
  getInitialState(){
    return { message: "" };
  },

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
          this.setState({message: "Created account and logged in as "+ username});
        } else
          this.setState({message: "Username already taken or password not long enough"});
        }
      }
    );
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
          this.setState({message: "Logged in as " + username});
        }
      }
    });
  },

  logoutExisting(){
    $.ajax({
      url: '/api/v1/session',
      type: 'DELETE',
      success: (reply) => {
        if(reply){
          this.props.logout();
          this.setState({ message: "Logged out" });
        }
      }
    });
  },

  renderButtons(){
    if(this.props.loggedIn){
      return(
        <button onClick={this.logoutExisting}>Logout from Account</button>
      );
    } else {
      return(
        <div>
          <button onClick={this.createAccount}>Create new Account</button>
          <button onClick={this.loginExisting}>Login to Pre-existing Account</button>
        </div>
      );
    }
  },

  render(){
    debugger;
    return(
      <div>
        <input ref='username' placeholder='username' />
        <input ref='password' placeholder='password' />
        <div>  |^|  </div>
        <div>  |-|  </div>
        <div>  |v|  </div>
        {this.renderButtons()}
        <div> {this.state.message} </div>
      </div>
    );
  }
});

var Game = React.createClass({
  getInitialState(){
    return { message: "" };
  },

  render(){
    return(
      <div>
        <button type="button" id="increment-counter" name="button">INCREMENT</button>
      </div>
    );
  }

});



ReactDOM.render(
  <Main/>, document.getElementById("main")
);
