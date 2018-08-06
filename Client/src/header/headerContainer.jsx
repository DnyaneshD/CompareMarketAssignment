import React, { PureComponent } from "react";
import HeaderComponent from "./headerComponent";

class HeaderContainer extends PureComponent {
  render() {
    return <HeaderComponent onInputChangeEvent={this.onInputChange} />;
  }

  onInputChange = term => {
    this.props.onSearchTermChange(term);
  };
}

export default HeaderContainer;
