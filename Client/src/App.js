import React, { PureComponent } from "react";
import HeaderComponent from "./header/headerComponent.jsx";
import InputComponent from "./inputComponent/inputComponent.jsx";
import ResultComponent from "./result/resultComponent";

class App extends PureComponent {
  constructor() {
    super();
    this.state = { hasError: false, responseMsg: null };
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
        <HeaderComponent />
        <InputComponent onResponseTextChange={this.onResponseTextChange} />
        <ResultComponent response={this.state.responseMsg} />
      </div>
    );
  }

  onResponseTextChange = response => {
    this.setState({ responseMsg: response });
  };
}

export default App;
