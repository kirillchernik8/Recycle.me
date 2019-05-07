import React, { Suspense } from "react";
import GoogleMapReact from "google-map-react";
import key from "../config.js";

const AnyReactComponent = () => (<div className = "marker"></div>);

class MapContainer extends React.Component {
  constructor(props) {
    super(props);
  }

  // returns simple google map
  render() {
    let api = key.key || process.env.key
    let coords = this.props.coords;
    return (
      <div className="mapContainer" style={{ width: "200px", height: "200px" }}>
        <GoogleMapReact
          bootstrapURLKeys={{ key: api }}
          defaultCenter={coords}
          center={coords}
          zoom={13}
        >
        <AnyReactComponent
            lat={coords.lat}
            lng={coords.lng}
            text="My Marker"
        />
       </GoogleMapReact>
      </div>
    );
  }
}

export default MapContainer;
