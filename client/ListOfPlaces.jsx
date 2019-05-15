import React from "react";
import Place from "./Place.jsx";

class ListOfPlaces extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <ul>
        {this.props.places.map(place => {
          if (place.address) {
            return <Place place={place} />;
          }
        })}
      </ul>
    );
  }
}

export default ListOfPlaces;
