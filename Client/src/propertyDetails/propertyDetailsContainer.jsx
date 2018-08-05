import React, { PureComponent } from "react";
import PropertyDetailsComponent from "./propertyDetailsComponent";
import properties from "./properties";

class PropertyDetailsContainer extends PureComponent {
  constructor(props) {
    super(props);
    this.state = { properties: [], hasError: false, noResultMatch: false };
  }

  componentDidMount() {
    this.setState({
      properties: properties
    });
  }

  componentDidCatch(error, info) {
    this.setState({ hasError: true });
  }

  componentDidUpdate(prevProps) {
    try {
      const { searchTerm } = this.props;

      if (searchTerm !== prevProps.searchTerm) {
        let filteredProperties = properties.filter(
          property =>
            property.name.search(searchTerm) > -1 ||
            property.description.search(searchTerm) > -1
        );

        this.setState({
          properties: filteredProperties
        });

        if (filteredProperties.length === 0) {
          this.setState({
            noResultMatch: true
          });
        }
      }
    } catch (err) {
      this.setState({ hasError: true });
    }
  }

  render() {
    if (this.state.hasError) {
      return <h1>Something went wrong. Please refresh page.</h1>;
    }

    if (this.state.noResultMatch) {
      return <h1>No result found. Please try changing search criteria.</h1>;
    }

    return this.state.properties.map(prop => {
      return <PropertyDetailsComponent key={prop.id} property={prop} />;
    });
  }
}

export default PropertyDetailsContainer;
