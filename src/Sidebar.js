import React from 'react';
import Autocomplete from 'react-autocomplete';

const styles = {
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
}

function isMatchingAirport(airport, value){

  return (
    airport.name.toLowerCase().indexOf(value.toLowerCase()) !== -1 ||
    (airport.iata && airport.iata.toLowerCase().indexOf(value.toLowerCase()) !== -1) ||
    (airport.city && airport.city.toLowerCase().indexOf(value.toLowerCase()) !== -1)
    );
}

const Sidebar = (props) => {
    return (
        <div>
          <form onSubmit={props.handleCalculateDistance}>
            <Autocomplete
              value={props.locationA}
              items={props.airports}
              getItemValue={(airport) => airport.name}
              onChange={props.handleLocationAUpdate}
              onSelect={props.handleLocationAClick}
              shouldItemRender={isMatchingAirport}
              renderItem={(airport, isHighlighted) => (
                <div
                style={isHighlighted ? styles.highlightedItem : styles.item}
                key={airport.id}
                >
                  {airport.name}
                </div>)
              }
            />
            <Autocomplete
              value={props.locationB}
              items={props.airports}
              getItemValue={(airport) => airport.name}
              onChange={props.handleLocationBUpdate}
              onSelect={props.handleLocationBClick}
              shouldItemRender={isMatchingAirport}
              renderItem={(airport, isHighlighted) => (
                <div
                style={isHighlighted ? styles.highlightedItem : styles.item}
                key={airport.id}
                >
                  {airport.name}
                </div>)
              }
            />

            <button type="submit" className="btn btn-success" > Find Distance </button>
          </form>
          {props.renderDistanceResults()}
        </div>

      );
  };

export default Sidebar;


          // <input id="locationA" placeholder="Enter a location!" onChange={props.handleLocationAUpdate} />
                    // <input id="locationB" placeholder="Enter a location!" onChange={props.handleLocationBUpdate} />
