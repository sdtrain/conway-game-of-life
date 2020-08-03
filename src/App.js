import React, { Component } from "react";
import "./App.css";
import NavBar from "./components/navbar";
import ButtonArray from "./components/buttonArray";
import algorithmGameOfLife from "./algorithmGameOfLife";

class App extends Component {
  _ROWS = 20;
  _COLS = 30;
  newState = this.makeRandom2DArray(this._ROWS, this._COLS);

  makeRandom2DArray(rows, cols) {
    if (rows <= 0 || cols <= 0) {
      console.log("Invalid no. of rows or columns");
      return;
    }
    let arr = new Array(rows);
    for (let i = 0; i < rows; i++) {
      arr[i] = new Array(cols);
      for (let j = 0; j < cols; j++) {
        arr[i][j] = Math.floor(Math.random() * 2);
      }
    }
    return arr;
  }

  reset2DArray() {
    const rows = this.newState.length;
    const cols = this.newState[0].length;
    let arr = new Array(rows);
    for (let i = 0; i < rows; i++) {
      arr[i] = new Array(cols);
      for (let j = 0; j < cols; j++) {
        arr[i][j] = 0;
      }
    }
    return arr;
  }

  state = {
    delay: null,
    totalTimesteps: 0,
    isRunning: 0,
    currentState: this.newState,
    statusText: "Press Start To Begin Simulation",
    buttonText: "Start",
  };

  delay = this.state.delay;
  totalTimesteps = this.state.totalTimesteps;
  elapsedTimesteps = this.state.elapsedTimesteps;
  isRunning = this.state.isRunning;
  // newState = this.state.currentState;

  render() {
    return (
      <div className="App">
        <NavBar
          delay={this.state.delay}
          timesteps={this.state.totalTimesteps}
          statusText={this.state.statusText}
          buttonText={this.state.buttonText}
          onStatusChange={this.handleStatusChange}
          onStart={this.handleStart}
          onStop={this.handleStop}
          onReset={this.handleReset}
        />
        <div className="buttonArray-center">
          <ButtonArray
            isRunning={this.state.isRunning}
            currentState={this.state.currentState}
            // currentState={this.currentState}
            onButtonClick={this.handleButtonClick}
          />
        </div>
      </div>
    );
  }

  handleStatusChange = (statusText, buttonText) => {
    this.setState({
      statusText: statusText,
      buttonText: buttonText,
    });
  };

  handleButtonClick = (row, col) => {
    if (this.state.isRunning) return;
    let currentState = [];
    for (let i = 0; i < this.state.currentState.length; i++) {
      currentState[i] = [...this.state.currentState[i]];
    }
    currentState[row][col] = (currentState[row][col] + 1) % 2;
    this.newState = currentState;
    this.setState({ currentState: currentState });
  };

  handleStart = (delay, totalTimesteps) => {
    this.setState({
      delay: delay,
      totalTimesteps: totalTimesteps,
      isRunning: 1,
      statusText: "Simulation Started",
      buttonText: "Stop",
    });
    this.delay = delay;
    this.totalTimesteps = totalTimesteps;
    this.elapsedTimesteps = 0;
    this.isRunning = 1;
    this.getNewState();
  };

  handleStop = () => {
    this.setState({
      delay: null,
      totalTimesteps: 0,
      isRunning: 0,
      statusText: "Press Start To Begin Simulation",
      buttonText: "Start",
    });
    this.delay = null;
    this.totalTimesteps = 0;
    this.elapsedTimesteps = 0;
    this.isRunning = 0;
  };

  handleReset = () => {
    this.newState = this.reset2DArray();
    this.setState({ currentState: this.newState });
  };

  getNewState = () => {
    console.log(
      this.delay,
      this.totalTimesteps,
      this.elapsedTimesteps,
      this.isRunning
    );
    if (this.elapsedTimesteps < this.totalTimesteps && this.isRunning) {
      // console.log("Algorithm called");
      // const t0 = performance.now();
      this.newState = algorithmGameOfLife(this.newState);
      // const t1 = performance.now();
      // console.log(`Took ${t1 - t0} ms`)
      this.setState({ currentState: this.newState });
      this.elapsedTimesteps++;
      setTimeout(() => {
        this.getNewState();
      }, this.delay * 1000);
    } else {
      this.handleStop();
    }
  };
}

export default App;
