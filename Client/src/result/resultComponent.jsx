import React, { PureComponent } from "react";
import "./results.css";
//import { subscribeToTimer } from "../api/connectSocket";
import axios from "axios";
import openSocket from "socket.io-client";
import InfiniteScroll from "react-infinite-scroller";

class ResultComponent extends PureComponent {
  socket = openSocket("http://localhost:3000");
  skip = 50;

  constructor() {
    super();
    this.state = { wordDetails: [], requestInProgress: true };
    this.subscribeToTimer();
  }

  requestWordList = async () => {
    this.skip += 50;
    let existingWordDetails = this.state.wordDetails;
    axios
      .get(`http://localhost:3000/v1/bookReader?skip=${this.skip}`)
      .then(response => {
        const newArray = existingWordDetails.concat(response.data);
        this.setState({
          wordDetails: newArray
        });
        //return response.data;
      });
  };

  // render() {
  //   const listItems = this.state.items.map(item => {
  //     return (
  //       <li key={item.name}>
  //         {item.name}-{item.count}-{item.isPrime ? "Prime" : "Not-Prime"}
  //       </li>
  //     );
  //   });

  //   console.log(this.requestWordList());

  //   return (
  //     <div styles={{ height: "700px", overflow: "auto" }}>
  //       <InfiniteScroll
  //         pageStart={0}
  //         loadMore={this.requestWordList()}
  //         hasMore={true || false}
  //         loader={
  //           <div className="loader" key={0}>
  //             Loading ...
  //           </div>
  //         }
  //         useWindow={false}>
  //         {listItems}
  //       </InfiniteScroll>
  //     </div>
  //   );
  // }

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
        <InfiniteScroll
          pageStart={0}
          loadMore={this.requestWordList}
          hasMore={true}
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
      this.requestWordList();
    });
    this.socket.emit("join", 1000);
  }
}

export default ResultComponent;
