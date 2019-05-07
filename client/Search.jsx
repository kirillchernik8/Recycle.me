import React from "react";

class Search extends React.Component {
  constructor(props) {
    super(props);
  }

  
  render() {
    return (
      <form onSubmit = {this.props.onSubmit}>
      <h4> Find recycling locations in Your borough! </h4>
      <input
        style={{ width: "300px" }}
        placeholder="Brooklyn, Manhattan, Queens, Staten Island,Bronx"
        onChange={this.props.onInput}
        type="text"
        value = {this.props.borough}
      />
      </form>
    );
  }
}

export default Search;
