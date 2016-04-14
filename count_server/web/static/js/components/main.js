import React from "react"
import ReactDOM from "react-dom"
import updater from "../updater"
import Authorize from "./authorize"
import Game from "./game"

var Main = React.createClass({
  getInitialState(){
    return {
            username: "",
            loggedIn: false,
             counter: parseInt($("#main")[0].className),
            updaterCloseSend: updater(this.renderIncrement)
           };
  },

  login(username){
    this.setState({ loggedIn: true, username: username });
    console.log("LOGGED $#%@^ IN");
  },

  logout(){
    this.setState({ loggedIn: false, username: ""});
    console.log("LOGGED #$%#$ OUT");
  },

  sendIncrement(){
    console.log("nice clicking ");
    this.state.updaterCloseSend.send();
    console.log("supposedly sent");
  },

  renderIncrement(reply){
    if(reply){
      this.setState({counter: reply});
    }
  },

  componentDidMount(){
    $.ajax({
      url: '/api/v1/sessions',
      type: 'GET',
      success: (reply) => {
        if(reply){
          this.login(reply);
          this.setState({message: "Logged in as "+ reply});
        } else
          this.setState({message: ""});
        }
      }
    );
  },

  render() {
    return (
      <div>
        <h1>Ready to furiously click some buttons?!</h1>
        <h3>Logged in as: {this.state.username}</h3>
        <Game counter={this.state.counter} loggedIn={this.state.loggedIn} sendIncrement={this.sendIncrement}/>
        <Authorize loggedIn={this.state.loggedIn} login={this.login} logout={this.logout}/>
      </div>
    );
  }
});

module.exports = Main
