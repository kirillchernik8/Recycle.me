import React, { Suspense } from "react";
import {addToFav, getFavs} from './queries.js'
import {
  graphql, compose
} from 'react-apollo'
import MapContainer from "./Map.jsx" ;
import Modal from "react-responsive-modal";

import {
  gql
} from 'apollo-boost'

// ReactModal.setAppElement("#app");


class Place extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modalIsOpen: false
    };
    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.savePlace = this.savePlace.bind(this)
  }

  openModal() {
    this.setState({
      modalIsOpen: true
    });
  }

  closeModal() {
    this.setState({
      modalIsOpen: false
    });
  }


  savePlace(e){
    e.preventDefault()
    this.props.addToFav({
      variables: {
        address: this.props.place.address,
        latitude: this.props.place.latitude,
        longitude: this.props.place.longitude,
      },
      refetchQueries: [{query: getFavs}]
    })
  }


  render() {
    let coords = {
      lat: Number(this.props.place.latitude),
      lng: Number(this.props.place.longitude)
    };
    return (
      <div>
      <li className="listItem" onClick={this.openModal} data-aos="flip-left">
        <h4 className = "circleText">{this.props.place.address}</h4>
      </li>
      <Modal open = {this.state.modalIsOpen} contentLabel="Map" closeOnOverlayClick ={true} onClose={this.closeModal} >
            <Suspense fallback={<div>Loading...</div>}>
            <button onClick={this.savePlace}> Save place </button>
            <p>{this.props.place.address}</p>
              <MapContainer className="mapContainer" coords={coords} />
            </Suspense>
          </Modal>
      </div>
    );
  }
}

export default compose(graphql(addToFav, {name: 'addToFav'}))(Place);


