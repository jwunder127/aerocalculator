import React from 'react';
import { Map, TileLayer, Marker, Popup } from 'react-leaflet';



const state = {
    lat: 39.5,
    lng: -98.35,
    zoom: 4,
  };
const LeafletMap = (props) => {
  const position = [state.lat, state.lng]
  return (
          <Map center={position} zoom={state.zoom}>
            <TileLayer
              attribution="&amp;copy <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"
              url="http://{s}.tile.osm.org/{z}/{x}/{y}.png"
            />
          </Map>
  );
};

export default LeafletMap;
