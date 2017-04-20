import React, { Component } from 'react';
import { Marker, Polyline, Popup } from 'react-leaflet';
import turf from 'turf';
import LeafletMap from './LeafletMap';
import Sidebar from './Sidebar';

const airports = require('../airports.json');

function isMatchingAirport(airport, value){
    return (
      airport.name.toLowerCase().indexOf(value.toLowerCase()) !== -1 ||
      (airport.iata && airport.iata.toLowerCase().indexOf(value.toLowerCase()) !== -1) ||
      (airport.city && airport.city.toLowerCase().indexOf(value.toLowerCase()) !== -1)
      );
  }

export default class AppContainer extends Component {
  constructor(props){
    super(props);
    this.state = {
      airports: airports,
      inputA: '',
      inputB: '',
      mapBounds: [[25, -120], [55, -75]]
    };
    this.handleClearData = this.handleClearData.bind(this);
    this.handleCalculateDistance = this.handleCalculateDistance.bind(this);
    this.handleInputAClick = this.handleInputAClick.bind(this);
    this.handleInputAUpdate = this.handleInputAUpdate.bind(this);
    this.handleInputBClick = this.handleInputBClick.bind(this);
    this.handleInputBUpdate = this.handleInputBUpdate.bind(this);
    this.renderDistanceResults = this.renderDistanceResults.bind(this);
    this.renderMarkersAndLine = this.renderMarkersAndLine.bind(this);
  }

  /* Sidebar functions*/
  handleClearData(){
    this.setState({
      airportOne: null,
      airportTwo: null,
      inputA: '',
      inputB: '',
      markerAirportOne: null,
      markerAirportTwo: null,
      nauticalDistance: null
    });
  }

  findAirports(airportOneName, airportTwoName){
    const allAirports = this.state.airports;
    const selectedAirports = [];
    for (let i = 0; i < allAirports.length; i++){
      if (allAirports[i].name === airportOneName || allAirports[i].name === airportTwoName){
        selectedAirports.push(allAirports[i]);
        if (selectedAirports.length === 2) {
          return selectedAirports;
        }
      }
    }
  }

  handleCalculateDistance(evt){
    evt.preventDefault();
    if (!this.state.inputA || !this.state.inputB) {
      alert('You need two airports to calculate distance!')
      return;
    }

    try {
      const [airportOne, airportTwo] = this.findAirports(this.state.inputA.trim(), this.state.inputB.trim());

      const locA = {
          type: 'Point',
          coordinates: [airportOne.longitude, airportOne.latitude]
        };

      const locB = {
        type: 'Point',
        coordinates: [airportTwo.longitude, airportTwo.latitude]
      };

      const distance = turf.distance(locA, locB, 'kilometers');
      const convertedDistance = distance * (1 / 1.852); //conversion to nautical miles

      const southWest = [
          Math.min(airportOne.latitude, airportTwo.latitude),
          Math.min(airportOne.longitude, airportTwo.longitude)
        ];
      const northEast = [
          Math.max(airportOne.latitude, airportTwo.latitude),
          Math.max(airportOne.longitude, airportTwo.longitude)
      ];
      this.setState({
        airportOne: airportOne,
        airportTwo: airportTwo,
        markerAirportOne: [airportOne.latitude, airportOne.longitude],
        markerAirportTwo: [airportTwo.latitude, airportTwo.longitude],
        mapBounds: [southWest, northEast],
        nauticalDistance: convertedDistance.toFixed(0)
      });
    } catch (err) {
      alert('One of your airports was invalid--make sure you select one from the drop-down menu.');
    }
  }

  handleInputAClick(value){
    this.setState({
      inputA: value
    });
  }

  handleInputAUpdate(evt){
    evt.preventDefault();
    this.setState({
      inputA: evt.target.value
    });
  }

  handleInputBClick(value){
    this.setState({
      inputB: value
    });

  }

  handleInputBUpdate(evt){
    evt.preventDefault();
    this.setState({
      inputB: evt.target.value
    });
  }


  renderDistanceResults(){
    if (this.state.nauticalDistance) {
      return (
        <div>
          The distance between {this.state.airportOne.name
          } and {this.state.airportTwo.name} is: {this.state.nauticalDistance} nautical miles!
        </div>
        );
    } else {
      return (
        <div>
          <p>
            To get started, enter an airport name, IATA code, or city
          </p>
        </div>
        );
    }
  }

  /* Map functions*/

  renderMarkersAndLine(){
    if (this.state.markerAirportOne && this.state.markerAirportTwo){
      return (
        <div>
          <Marker position={this.state.markerAirportOne}>
            <Popup>
              <div>
                <p>{this.state.airportOne.name}</p>
              </div>
            </Popup>
          </Marker>
          <Marker position={this.state.markerAirportTwo}>
            <Popup>
              <div>
                <p>{this.state.airportTwo.name}</p>
              </div>
            </Popup>
          </Marker>
          <Polyline positions={[this.state.markerAirportOne, this.state.markerAirportTwo]}>
            <Popup>
              <div>
                <p>{this.state.nauticalDistance} nautical miles</p>
              </div>
            </Popup>
          </Polyline>
        </div>
      );
    }
  }

  /* Final Render */
  render() {
    return (
      <div>
        <div id="sidebar" className="col-xs-4" >
          <Sidebar
            airports={this.state.airports}
            inputA={this.state.inputA}
            inputB={this.state.inputB}
            handleClearData={this.handleClearData}
            handleCalculateDistance={this.handleCalculateDistance}
            handleInputAClick={this.handleInputAClick}
            handleInputAUpdate={this.handleInputAUpdate}
            handleInputBClick={this.handleInputBClick}
            handleInputBUpdate={this.handleInputBUpdate}
            isMatchingAirport={isMatchingAirport}
            renderDistanceResults={this.renderDistanceResults}
          />
        </div>
        <div id="map" className="col-xs-8" >
          <LeafletMap
            mapBounds={this.state.mapBounds}
            renderMarkersAndLine={this.renderMarkersAndLine}
          />
        </div>
      </div>
    );
  }
}
