import React, { Component } from "react";
import "./buttonArray.css";

class ButtonArray extends Component {
  render() {
    return this.getButtonArray();
  }

  getButtonClasses(row, col) {
    let classes = "btn rounded-0 square btn-";
    classes += this.props.currentState[row][col] === 1 ? "dark" : "light";
    return classes;
  }

  getButton(row, col) {
    return (
      <span
        // type="button"
        className={this.getButtonClasses(row, col)}
        onClick={() => this.props.onButtonClick(row, col)}
      ></span>
    );
  }

  getButtonRow(rowArray, row) {
    let col = 0;
    return (
      <tr key={row}>
        {rowArray.map(() => (
          <th key={col}>{this.getButton(row, col++)}</th>
        ))}
      </tr>
    );
  }

  getButtonArray() {
    let row = 0;
    return (
      <table className="w3-centered w3-card-4">
        <tbody>
          {this.props.currentState.map((rowArray) =>
            this.getButtonRow(rowArray, row++)
          )}
        </tbody>
      </table>
    );
  }
}

export default ButtonArray;
