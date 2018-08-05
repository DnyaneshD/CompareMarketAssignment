import React, { PureComponent } from "react";
import PropertyComponent from "../property/propertyComponent";

class PropertyDetailsComponent extends PureComponent {
  render() {
    return <PropertyComponent property={this.props.property} />;
  }
}

export default PropertyDetailsComponent;
