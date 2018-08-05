import React, { PureComponent } from "react";
import HeaderContainer from "./header/headerContainer";
import PropertyDetailsContainer from "./propertyDetails/propertyDetailsContainer";

class App extends PureComponent {
  constructor() {
    super();
    this.state = { searchTerm: "", hasError: false };
  }

  componentDidCatch(error, info) {
    this.setState({ hasError: true });
  }

  render() {
    if (this.state.hasError) {
      return <h1>Something went wrong.</h1>;
    }

    return (
      <div>
        <HeaderContainer onSearchTermChange={this.onSearchTermChange} />
        <PropertyDetailsContainer searchTerm={this.state.searchTerm} />
      </div>
    );
  }

  onSearchTermChange = term => {
    this.setState({ searchTerm: term });
  };
}

export default App;
