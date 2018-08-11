import React, { PureComponent } from "react";
import "./results.css";
import InputComponent from "../inputComponent/inputComponent";
import axios from "axios";
import openSocket from "socket.io-client";
import InfiniteScroll from "react-infinite-scroller";

class ResultComponent extends PureComponent {
  socket = openSocket("http://localhost:3000");
  skip = 50;

  constructor() {
    super();
    this.state = { wordDetails: [], requestInProgress: true, hasMore: false };
    this.subscribeToTimer();
  }

  requestWordList = async () => {
    if (this.state.requestInProgress) return;
    this.skip += 50;
    let existingWordDetails = this.state.wordDetails;
    axios
      .get(`http://localhost:3000/v1/bookReader?skip=${this.skip}`)
      .then(response => {
        const newArray = existingWordDetails.concat(response.data);
        this.setState({
          wordDetails: newArray,
          hasMore: true
        });
      });
  };

  render() {
    const loader = <div className="loader">Loading ...</div>;

    var items = [];
    this.state.wordDetails.map((item, i) => {
      return items.push(
        <tr key={i}>
          <td align="left">{item.name}</td>
          <td align="left">{item.count}</td>
          <td align="left">{item.isPrime ? "Prime" : "Not-Prime"}</td>
        </tr>
      );
    });

    return (
      <div className="results">
        {items.length === 0 ? (
          <label htmlFor="recipient-name">{this.props.response}</label>
        ) : (
          ""
        )}
        <InfiniteScroll
          pageStart={0}
          loadMore={this.requestWordList}
          hasMore={this.state.hasMore}
          loader={loader}>
          <div className="tracks">
            <table align="center">
              <thead>
                <tr>
                  <th>Word</th>
                  <th>Count</th>
                  <th>Is Prime</th>
                </tr>
              </thead>
              <tbody>{items}</tbody>
            </table>
          </div>
        </InfiniteScroll>
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
      this.setState({
        hasMore: true
      });
      this.requestWordList();
    });
    this.socket.emit("join", 1000);
  }
}

export default ResultComponent;
