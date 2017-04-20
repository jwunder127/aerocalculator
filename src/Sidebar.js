import React from 'react';
import Autocomplete from 'react-autocomplete';

const styles = {
    input: {
      width: 250
    },

    item: {
    padding: '2px 6px',
    cursor: 'default'
  },
    highlightedItem: {
    color: 'white',
    background: 'hsl(200, 50%, 50%)',
    padding: '2px 6px',
    cursor: 'default'
  },
};

const Sidebar = (props) => {
    return (
        <div>
          <h1>Welcome to the Aerocalculator!</h1>
          <h4> Calculate the distance between any two American airports </h4>
          <form onSubmit={props.handleCalculateDistance}>
            <div className="airport-input" >
            <label>Airport 1: </label>
            <Autocomplete
              value={props.inputA}
              items={props.airports}
              getItemValue={(airport) => airport.name}
              onChange={props.handleInputAUpdate}
              onSelect={props.handleInputAClick}
              shouldItemRender={props.isMatchingAirport}
              inputProps={{style: styles.input}}
              renderItem={(airport, isHighlighted) => (
                <div
                style={isHighlighted ? styles.highlightedItem : styles.item}
                key={airport.id}
                >
                  {airport.name} ({airport.iata})
                </div>)
              }
            />
            </div>
            <div className="airport-input">
              <label>Airport 2: </label>
              <Autocomplete
                value={props.inputB}
                items={props.airports}
                getItemValue={(airport) => airport.name}
                onChange={props.handleInputBUpdate}
                onSelect={props.handleInputBClick}
                shouldItemRender={props.isMatchingAirport}
                inputProps={{style: styles.input}}
                renderItem={(airport, isHighlighted) => (
                  <div
                  style={isHighlighted ? styles.highlightedItem : styles.item}
                  key={airport.id}
                  >
                    {airport.name}
                  </div>)
                }
              />
            </div>
            <div>
              <button type="submit" className="btn btn-success" > Calculate Distance </button>
              <button type="button" className="btn btn-info" onClick={props.handleClearData} > Clear Data </button>
            </div>
          </form>
          {props.renderDistanceResults()}
        </div>

      );
  };

export default Sidebar;
