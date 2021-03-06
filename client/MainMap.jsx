import React, { Suspense } from "react";
import GoogleMapReact from "google-map-react";
import axios from "axios";
import key from "../config.js";

const Marker = () => <div className="marker" />;

class MainMap extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      places: [],
      tooltipOpen: false
    };
    this.getAllPlaces = this.getAllPlaces.bind(this);
  }

  componentDidMount() {
    this.getAllPlaces();
  }

  // needed for the heatmap. Gets all the locations in NYC
  getAllPlaces() {
    axios
      .get(`https://data.cityofnewyork.us/resource/sxx4-xhzg.json`)
      .then(places => this.setState({ places: places.data }))
      .catch(err => console.error(err));
  }

  render() {
    let api = key.key || process.env.key;
    return (
      <div className="mainMap">
        <div className="checkoutMap">
          {" "}
          Check out all the recycling locations in New York{" "}
        </div>
        <GoogleMapReact
          bootstrapURLKeys={{ key: api }}
          defaultCenter={{ lat: 40.7128, lng: -73.91 }} // view of NYC
          zoom={11}
        >
          {this.state.places.map(place => {
            return (
              <Marker lat={place.latitude} lng={place.longitude} /> // puts markers on the map
            );
          })}
        </GoogleMapReact>
      </div>
    );
  }
}

export default MainMap;
