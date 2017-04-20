import React from 'react';
import { Map, TileLayer } from 'react-leaflet';

const LeafletMap = (props) => {
  return (
          <Map bounds={props.mapBounds}>
            <TileLayer
              attribution="&amp;copy <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"
              url="http://{s}.tile.osm.org/{z}/{x}/{y}.png"
            />
            {props.renderMarkersAndLine()}
          </Map>
  );
};

export default LeafletMap;
