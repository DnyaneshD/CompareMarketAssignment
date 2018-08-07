import React, { PureComponent } from "react";
import axios from "axios";
import "./input.css";

class InputComponent extends PureComponent {
  constructor() {
    super();
    this.state = { inputUri: "" };
  }

  render() {
    return (
      <div className="background">
        <input
          value={this.state.inputUri}
          className="input"
          placeholder="Please provide input URI for word count here"
          onChange={this.onInputChange}
        />
        <button className="submitButton" onClick={this.onSendRequest}>
          Submit
        </button>
      </div>
    );
  }

  onInputChange = event => {
    this.setState({ inputUri: event.target.value });
  };

  onSendRequest = () => {
    axios
      .post("http://localhost:3000/v1/bookReader", {
        url:
          "http://www.loyalbooks.com/download/text/Railway-Children-by-E-Nesbit.txt"
      })
      .then(response => console.log(response));
  };
}

export default InputComponent;
