import React, { useState, useEffect } from "react"

const LocationsContext = React.createContext()

function LocationsProvider({children}){
    const [airportToCityMap, setAirportToCityMap] = useState({});
    const [cityToAirportMap, setCityToAirportMap] = useState({});
    const [locations, setLocations] = useState([]);

    async function fetchData() {
      try {
        const response = await fetch('static/locations.json');
        const data = await response.json();

        // Update states
        const airportToCity = {};
        const cityToAirport = {};

        for (const location of data['locations']) {
          airportToCity[location.airport] = location.city;
          cityToAirport[location.city] = location.airport;
        }

        setAirportToCityMap(airportToCity);
        setCityToAirportMap(cityToAirport);
        setLocations(data['locations']);
        // console.log( 'airport to city', airportToCityMap, 'city to airport', cityToAirportMap, 'locations', locations )
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }

    // return to this for understanding
    useEffect(() => {
        // Fetch data and update states here    
        fetchData();
      }, []);

    return (
        <LocationsContext.Provider value={{ airportToCityMap, cityToAirportMap, locations }}>
           {children}
        </LocationsContext.Provider>
    )
}

export { LocationsContext, LocationsProvider }