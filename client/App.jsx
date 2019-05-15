import React, { Suspense } from "react";
import ReactDOM from "react-dom";
import Search from "./Search.jsx";
import ListOfPlaces from "./ListOfPlaces.jsx";
import axios from "axios";
import ApolloClient from "apollo-boost";
import { ApolloProvider } from "react-apollo";
import FavPlaces from "./FavoritePlaces.jsx";
import MainMap from "./MainMap.jsx";

// Based on GraphQL
const client = new ApolloClient({
  uri: "https://cryptic-eyrie-61443.herokuapp.com/graphql"
});

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      borough: "",
      places: []
    };

    this.onInput = this.onInput.bind(this);
    this.getPlaces = this.getPlaces.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onInput(e) {
    this.setState({
      borough: e.target.value
    });
  }

  // sends an API request which returns an array of recycle stations in selected borough
  getPlaces() {
    axios
      .get(
        `https://data.cityofnewyork.us/resource/sxx4-xhzg.json?borough=${
          this.state.borough
        }`
      )
      .then(places => this.setState({ places: places.data }))
      .catch(err => console.error(err));
  }

  // On submiting the form makes a request to get locations and updates the state
  onSubmit(e) {
    e.preventDefault();
    this.getPlaces();
  }

  render() {
    return (
      <ApolloProvider client={client}>
        <div>
          <p className="header">RECYCLE ME!</p>
          <FavPlaces />
          <Search
            onInput={this.onInput}
            onSubmit={this.onSubmit}
            borough={this.state.borough}
          />
          <ListOfPlaces places={this.state.places} />
          <p className="or"> or </p>
          <Suspense fallback={<div>Loading...</div>}>
            <MainMap />
          </Suspense>
        </div>
      </ApolloProvider>
    );
  }
}

ReactDOM.render(<App />, document.getElementById("app"));
