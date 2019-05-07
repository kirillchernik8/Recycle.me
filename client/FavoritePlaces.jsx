import React, { Suspense } from "react";
import { addToFav, getFavs } from "./queries.js";
import { graphql, compose } from "react-apollo";
import { gql } from "apollo-boost";
import Place from './Place.jsx'

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
    console.log(data);
    if (data.loading) {
      return <div>Loading places...</div>;
    } else {
      this.setState({ favs: data.places });
    }
  }

  render() {
    return (
      <div className = "favorites">
        <button className = "showFavs" onClick={this.displayPlace}>Show favs</button>
        <ul>
          {this.state.favs.map(place => {
            return <Place place = {place}/>;
          })}
        </ul>
        <hr/>
      </div>
    );
  }
}

export default graphql(getFavs)(FavPlaces);
