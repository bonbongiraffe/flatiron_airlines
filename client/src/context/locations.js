import React, { useState, useEffect } from "react"

const LocationsContext = React.createContext()

function LocationsProvider({children}){
    const [airportToCityMap, setAirportToCityMap] = useState({});
    const [cityToAirportMap, setCityToAirportMap] = useState({});
    const [locations, setLocations] = useState([]);

    // return to this for understanding
    useEffect(() => {
        // Fetch data and update states here
        async function fetchData() {
          try {
            const response = await fetch('static/locations');
            const data = await response.json();
    
            // Update states
            const airportToCity = {};
            const cityToAirport = {};
    
            for (const location of data) {
              airportToCity[location.airport] = location.city;
              cityToAirport[location.city] = location.airport;
            }
    
            setAirportToCityMap(airportToCity);
            setCityToAirportMap(cityToAirport);
            setLocations(data);
          } catch (error) {
            console.error('Error fetching data:', error);
          }
        }
    
        fetchData();
      }, []);

    return (
        <LocationsContext.Provider value={{ airportToCityMap, cityToAirportMap, locations }}>
           {children}
        </LocationsContext.Provider>
    )
}

export { LocationsContext, LocationsProvider }