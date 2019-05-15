import React from "react";
import { getFavs } from "./queries.js";
import { graphql } from "react-apollo";
import Place from "./Place.jsx";

class FavPlaces extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      favs: []
    };
    this.displayPlace = this.displayPlace.bind(this);
  }

  displayPlace() {
    let data = this.props.data;
    if (data.loading) {
      // analog of React.Suspence
      return <div>Loading places...</div>;
    } else {
      this.setState({ favs: data.places });
    }
  }

  render() {
    return (
      <div className="favorites">
        <button className="showFavs" onClick={this.displayPlace}>
          Show saved places
        </button>
        <ul>
          {this.state.favs.map(place => {
            return <Place place={place} />;
          })}
        </ul>
        <hr />
      </div>
    );
  }
}

export default graphql(getFavs)(FavPlaces);
