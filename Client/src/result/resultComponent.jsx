import React, { PureComponent } from "react";
//import "./header.css";
//import { subscribeToTimer } from "../api/connectSocket";
import axios from "axios";
import openSocket from "socket.io-client";

class ResultComponent extends PureComponent {
  socket = openSocket("http://localhost:3000");

  constructor() {
    super();
    this.state = { items: [], requestInProgress: true };
    this.subscribeToTimer();
  }

  requestWordList() {
    axios.get("http://localhost:3000/v1/bookReader?skip=50").then(response => {
      this.setState({
        items: response.data
      });
    });
  }

  render() {
    const listItems = this.state.items.map(item => {
      return (
        <li key={item.name}>
          {item.name}-{item.count}-{item.isPrime ? "Prime" : "Not-Prime"}
        </li>
      );
    });

    return (
      <div>
        Result will appear here.
        <div>{listItems}</div>
      </div>
    );
  }

  onInputChange = event => {
    this.setState({ seachTerm: event.target.value });
    this.props.onInputChangeEvent(event.target.value);
  };

  onClearInput = () => {
    this.setState({ seachTerm: "" });
    this.props.onInputChangeEvent("");
  };

  updateReuestStatus = result => {
    this.setState({
      requestInProgress: result
    });
  };

  subscribeToTimer(cb) {
    this.socket.on("requestProcessed", result => {
      this.setState({
        requestInProgress: !result
      });
      this.requestWordList();
    });
    this.socket.emit("join", 1000);
  }
}

export default ResultComponent;
