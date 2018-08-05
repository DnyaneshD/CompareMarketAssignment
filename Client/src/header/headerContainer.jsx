import React, { PureComponent } from "react";
import HeaderComponent from "./headerComponent";
import { subscribeToTimer } from "../api/connectSocket";

class HeaderContainer extends PureComponent {
  constructor(props) {
    super(props);
    subscribeToTimer((err, timestamp) =>
      this.setState({
        timestamp
      })
    );
  }

  render() {
    return <HeaderComponent onInputChangeEvent={this.onInputChange} />;
  }

  onInputChange = term => {
    this.props.onSearchTermChange(term);
  };
}

export default HeaderContainer;
