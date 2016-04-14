import React from "react"
import ReactDOM from "react-dom"

var Game = React.createClass({
  getInitialState(){
    return { message: "" };
  },

  clickIt(){
    return  (<div>
                <button type="button" className="btn-big-red" onClick={this.props.sendReset}>RESET</button>
                <h3>{this.props.counter}</h3>
              </div>
            )
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

module.exports = Game
