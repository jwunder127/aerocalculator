/* eslint-disable no-unused-expressions */
import React from 'react';
import { assert, expect } from 'chai';
import { shallow } from 'enzyme';

import AppContainer, { isMatchingAirport } from './AppContainer';

describe('-----AppContainer functionality-----', () => {

  let airportOne;
  let airportTwo;
  let airportThree;
  let AppContainerWrapper;

  beforeEach(() => {
    airportOne = {
      id: 3797,
      iata: 'JFK',
      longitude: -73.77890015,
      latitude: 40.63980103,
      type: 'airport',
      source: 'OurAirports',
      dst: 'A',
      city: 'New York',
      timezone: -5,
      altitude: 13,
      country: 'United States',
      name: 'John F Kennedy International Airport',
      icao: 'KJFK'
    };

    airportTwo =   {
      id: 3484,
      iata: 'LAX',
      longitude: -118.4079971,
      latitude: 33.94250107,
      type: 'airport',
      source: 'OurAirports',
      dst: 'A',
      city: 'Los Angeles',
      timezone: -8,
      altitude: 125,
      country: 'United States',
      name: 'Los Angeles International Airport',
      icao: 'KLAX'
    };

    airportThree =   {
      id: 3484,
      iata: 'XXX',
      longitude: -118.4079971,
      latitude: 33.94250107,
      type: 'spaceport',
      source: 'OurAirports',
      dst: 'A',
      city: 'Moon City',
      timezone: -8,
      altitude: 125,
      country: 'Moon Country',
      name: 'Magical Airport on the Moon',
      icao: 'KXXX'
    };

    AppContainerWrapper = shallow(<AppContainer />).instance();
  });

  describe('isMatchingAirport function', () => {
    let airport;
    beforeEach(() => {
       airport = {
        name: 'John F Kennedy International Airport',
        iata: 'JFK',
        city: 'New York'
      };
    });

    it('returns true if part of airport name is typed', () => {
      let nameTrue = 'John F';
      let nameFalse = 'Jhon F';

      expect(isMatchingAirport(airport, nameTrue)).to.be.true;
      expect(isMatchingAirport(airport, nameFalse)).to.be.false;
    });

    it('returns true if part of an IATA code is typed', () => {
      let iataTrue = 'JF';
      let iataFalse = 'JQ';

      expect(isMatchingAirport(airport, iataTrue)).to.be.true;
      expect(isMatchingAirport(airport, iataFalse)).to.be.false;

    });

    it('returns true if part of a city is typed', () => {
      let cityTrue = 'New Yo';
      let cityFalse = 'Nwe jj';

      expect(isMatchingAirport(airport, cityTrue)).to.be.true;
      expect(isMatchingAirport(airport, cityFalse)).to.be.false;
    });
  });

  describe('findAirports', () => {

    it('return two airports when two valid airport Names are provided', () => {
      const foundAirports = AppContainerWrapper.findAirports(airportOne.name, airportTwo.name);

      assert.isDefined(foundAirports);
      assert.isArray(foundAirports);
      assert.lengthOf(foundAirports, 2);
    });

    it('returns undefind when an invalid airport is submitted', () => {
      const foundAirports = AppContainerWrapper.findAirports(airportOne.name, airportThree.name);

      assert.isUndefined(foundAirports);
    });
  });

  describe('handleInputs', () => {
    it('updates state when inputs are submitted', () => {

      expect(AppContainerWrapper.state.inputA).to.equal('');
      expect(AppContainerWrapper.state.inputB).to.equal('');
      AppContainerWrapper.handleInputAClick(airportOne.name);
      AppContainerWrapper.handleInputBClick(airportTwo.name);
      expect(AppContainerWrapper.state.inputA).to.equal(airportOne.name);
      expect(AppContainerWrapper.state.inputB).to.equal(airportTwo.name);
    });
  });

  describe('handleCalculateDistance', () => {

    beforeEach( () => {

      AppContainerWrapper.handleInputAClick(airportOne.name);
      AppContainerWrapper.handleInputBClick(airportTwo.name);
    });

    it('sets the nautical distance property on the state.', () => {

      //evt.preventDefault simulated here. No need for real thing in testing
      const event = {preventDefault: () => {}};

      assert.isUndefined(AppContainerWrapper.state.nauticalDistance);
      AppContainerWrapper.handleCalculateDistance(event);
      assert.isDefined(AppContainerWrapper.state.nauticalDistance);
    });
  });

});

