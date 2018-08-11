import React, { PureComponent } from "react";
import axios from "axios";
import "./input.css";

class InputComponent extends PureComponent {
  constructor() {
    super();
    this.state = { inputUri: "", response: "" };
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
        url: this.state.inputUri
      })
      .then(response => {
        this.props.onResponseTextChange(response.data.message);
      });
  };

  clearMessage = () => {
    this.setState({
      response: null
    });
  };
}

export default InputComponent;
