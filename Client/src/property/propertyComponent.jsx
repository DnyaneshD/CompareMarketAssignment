import React, { PureComponent } from "react";
import "./property.css";

class PropertyComponent extends PureComponent {
  render() {
    return (
      <div className="property">
        <span className="name">{this.props.property.name}</span>
        <span>{this.props.property.description}</span>
        <div className="details">
          <span>Floor Area: {this.props.property.floorArea}</span>
          <span>Bathrooms: {this.props.property.bathrooms}</span>
        </div>
      </div>
    );
  }
}

export default PropertyComponent;
