import React, { PureComponent } from "react";
import "./header.css";

class HeaderComponent extends PureComponent {
  render() {
    return (
      <div>
        <label className="heading">Compare Market Assignment</label>
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
