import React, { PureComponent } from "react";
import HeaderComponent from "./header/headerComponent.jsx";
import InputComponent from "./inputComponent/inputComponent.jsx";
import ResultComponent from "./result/resultComponent";

class App extends PureComponent {
  constructor() {
    super();
    this.state = { hasError: false };
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
        <InputComponent />
        <ResultComponent />
      </div>
    );
  }
}

export default App;
