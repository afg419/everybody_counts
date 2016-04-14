import "phoenix_html"
import React from "react"
import ReactDOM from "react-dom"
import updater from "./updater"

var Main = React.createClass({
  getInitialState(){
    return {loggedIn: false,
             counter: parseInt($("#main")[0].className),
            updaterCloseSend: updater(this.renderIncrement)};
  },

  login(){
    this.setState({ loggedIn: true });
    console.log("LOGGED $#%@^ IN");
  },

  logout(){
    this.setState({ loggedIn: false});
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

  },

  render() {
    return (
      <div>
        <h1>Ready to furiously click some buttons?!</h1>
        <Game counter={this.state.counter} loggedIn={this.state.loggedIn} sendIncrement={this.sendIncrement}/>
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
      url: '/api/v1/sessions/new',
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
      url: '/api/v1/sessions',
      type: 'POST',
      data: {username: username, password: password},
      success: (reply) => {
        if(reply){
          this.props.login();
          this.setState({message: "Logged in as " + username});
        } else {
          this.setState({message: "Make a new account for " + username + " first!"});
        }
      }
    });
  },

  logoutExisting(){
    $.ajax({
      url: '/api/v1/sessions',
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

  clickIt(){
    return (<div>
              <button type="button" onClick={this.props.sendIncrement}>INCREMENT</button>
              <h3>{this.props.counter}</h3>
            </div>)
  },

  render(){
    var renderable = <div></div>
    if(this.props.loggedIn){
      renderable = this.clickIt();
    }
    return(
      renderable
    );
  }

});



ReactDOM.render(
  <Main/>, document.getElementById("main")
);
