var Authorize = React.createClass({
  createAccount(){
    console.log("CREATIVE!");
  },

  login(){
    console.log("I EXIST");
  },

  render(){
    return(
      <div>
        <button onClick={this.createAccount}>Create new Account</button>
        <button onClick={this.login}>Login to Pre-existing Account</button>
      </div>
    )
  };
})
