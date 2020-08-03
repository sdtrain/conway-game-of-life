import React, { Component } from "react";

class NavBar extends Component {
  render() {
    return (
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <a className="navbar-brand" href="/">
          Conway's Game Of Life
        </a>
        <div className="form-inline my-2 my-lg-0" id="navbar-main">
          <button
            onClick={() => {
              this.props.onStop();
              this.props.onReset();
            }}
            className="btn btn-secondary my-2 my-sm-0"
          >
            Reset
          </button>
          <span className="nav-item nav-link m-2">Delay:</span>
          <input
            name="delay"
            id="delay"
            type="number"
            ref={(delay) => (this.variableDelay = delay)}
            className="form-control mr-sm-2"
            placeholder="Delay (in sec)"
          />
          <span className="nav-item nav-link m-2">No. of Timesteps:</span>
          <input
            name="timesteps"
            id="timesteps"
            type="number"
            ref={(timesteps) => (this.variableTimesteps = timesteps)}
            className="form-control mr-sm-2"
            placeholder="No. of Timesteps"
          />
          <button
            onClick={this.handleClick}
            className="btn btn-secondary my-2 my-sm-0"
          >
            {this.props.buttonText}
          </button>
        </div>
        <p className="nav-item nav-link m-2"> {this.props.statusText} </p>
      </nav>
    );
  }

  handleClick = () => {
    if (this.props.buttonText === "Stop") {
      this.props.onStop();
    } else if (!this.validateClickState()) {
      this.props.onStatusChange(
        "Delay should be atleast zero and Timesteps should be atleast one",
        "Start"
      );
    } else {
      this.props.onStart(
        this.variableDelay.valueAsNumber,
        this.variableTimesteps.valueAsNumber
      );
    }
  };

  validateClickState() {
    if (
      this.variableDelay.valueAsNumber >= 0 &&
      this.variableTimesteps.valueAsNumber > 0
    )
      return true;
  }
}

export default NavBar;
