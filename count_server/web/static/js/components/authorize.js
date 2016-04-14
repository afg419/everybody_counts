import React from "react"
import ReactDOM from "react-dom"

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
          this.props.login(username);
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
          this.props.login(username);
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
          <input ref='username' placeholder='username' />
          <input ref='password' placeholder='password' />
          <div>  |^|  </div>
          <div>  |-|  </div>
          <div>  |v|  </div>
          <button onClick={this.createAccount}>Create new Account</button>
          <button onClick={this.loginExisting}>Login to Pre-existing Account</button>
        </div>
      );
    }
  },

  render(){
    return(
      <div>
        {this.renderButtons()}
        <div> {this.state.message} </div>
      </div>
    );
  }
});

module.exports = Authorize
