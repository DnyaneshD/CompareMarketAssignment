import React, { PureComponent } from "react";
import "./header.css";

class HeaderComponent extends PureComponent {
  constructor() {
    super();
    this.state = { seachTerm: "" };
  }

  render() {
    return (
      <div>
        <label className="heading">HTM Property App</label>
        <div className="search">
          <input
            value={this.state.seachTerm}
            className="searchInput"
            placeholder="Please type here name or description"
            onChange={this.onInputChange}
          />
          <button className="clearButton" onClick={this.onClearInput}>
            Clear
          </button>
        </div>
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
}

export default HeaderComponent;
