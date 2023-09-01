import React, { useState, useEffect } from "react"

const LocationsContext = React.createContext()

function LocationsProvider({children}){
    const [airportToCityMap, setAirportToCityMap] = useState({});
    const [cityToAirportMap, setCityToAirportMap] = useState({});
    const [locations, setLocations] = useState([]);
    const [airports, setAirports] = useState([]);
    const [cities, setCities] = useState([]);

    function getAirports(){
      fetch('airports')
        .then( r => r.json())
        .then( airports => {
          // console.log(airports)
          const airportToCity = {}
          const cityToAirport = {}
          airports.forEach(airport => {
            airportToCity[airport.id_code] = airport.city
            cityToAirport[airport.city] = airport.id_code
          })

          setAirportToCityMap(airportToCity)
          setCityToAirportMap(cityToAirport)
          setLocations(airports)
          setAirports(Object.keys(airportToCity))
          setCities(Object.values(airportToCity))
        })
    }

    useEffect(()=>{
      getAirports()
    },[])

    // async function fetchData() {
    //   try {
    //     const response = await fetch('static/locations.json');
    //     const data = await response.json();

    //     // Update states
    //     const airportToCity = {};
    //     const cityToAirport = {};

    //     for (const location of data['locations']) {
    //       airportToCity[location.airport] = location.city;
    //       cityToAirport[location.city] = location.airport;
    //     }

    //     setAirportToCityMap(airportToCity);
    //     setCityToAirportMap(cityToAirport);
    //     setLocations(data['locations']);
    //     setAirports(Object.keys(airportToCity));
    //     setCities(Object.values(airportToCity));
    //     // console.log( 'airport to city', airportToCityMap, 'city to airport', cityToAirportMap, 'locations', locations )
    //   } catch (error) {
    //     console.error('Error fetching data:', error);
    //   }
    // }

    // // return to this for understanding
    // useEffect(() => {
    //     // Fetch data and update states here    
    //     fetchData();
    //   }, []);

    return (
        <LocationsContext.Provider value={{ airportToCityMap, cityToAirportMap, locations, airports, cities }}>
           {children}
        </LocationsContext.Provider>
    )
}

export { LocationsContext, LocationsProvider }