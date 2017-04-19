import React, { Component } from 'react';
import turf from 'turf';
import LeafletMap from './LeafletMap';
import Sidebar from './Sidebar';

const airports = require('../airports.json');


export default class AppContainer extends Component {
  constructor(props){
    super(props);
    this.state = {
      airports: airports,
      locationA: '',
      locationB: '',
      distance: '',
    };
    this.handleCalculateDistance = this.handleCalculateDistance.bind(this);
    this.handleLocationAClick = this.handleLocationAClick.bind(this);
    this.handleLocationAUpdate = this.handleLocationAUpdate.bind(this);
    this.handleLocationBClick = this.handleLocationBClick.bind(this);
    this.handleLocationBUpdate = this.handleLocationBUpdate.bind(this);
    this.renderDistanceResults = this.renderDistanceResults.bind(this);
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
    const [airportOne, airportTwo] = this.findAirports(this.state.locationA, this.state.locationB);

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
    this.setState({nauticalDistance: convertedDistance.toFixed(0)});
  }

  handleLocationAClick(value){
    this.setState({
      locationA: value
    });
  }

  handleLocationAUpdate(evt){
    evt.preventDefault();
    this.setState({
      locationA: evt.target.value
    });
  }

  handleLocationBClick(value){
    this.setState({
      locationB: value
    });

  }

  handleLocationBUpdate(evt){
    evt.preventDefault();
    this.setState({
      locationB: evt.target.value
    });
  }

  renderDistanceResults(){
    if(this.state.nauticalDistance) {
      return (
        <div>
          The distance between {this.state.locationA} and {this.state.locationB} is: {this.state.nauticalDistance} nautical miles!
        </div>
        )
    } else {
      return (
        <div>Select and airport to get started </div>
        )
    }
  }


  render() {
    return (
      <div>
        <div id="sidebar" className="col-xs-4" >
          <Sidebar
            airports={this.state.airports}
            locationA={this.state.locationA}
            locationB={this.state.locationB}
            handleCalculateDistance={this.handleCalculateDistance}
            handleLocationAClick={this.handleLocationAClick}
            handleLocationAUpdate={this.handleLocationAUpdate}
            handleLocationBClick={this.handleLocationBClick}
            handleLocationBUpdate={this.handleLocationBUpdate}
            renderDistanceResults={this.renderDistanceResults}
          />
        </div>
        <div id="map" className="col-xs-8" >
          <LeafletMap />
        </div>
      </div>
    );
  }
}
