// // file is deprecated, not in use
// const fetchLocationsData = async () => {
//     try {
//         const response = fetch('/static/locations.json')
//         if (!response.ok){
//             throw new Error('Failed to fetch locations data')
//         }
//         const data = await response.json()
//         return data;
//     } catch ( error ){
//         console.error(error);
//         return []
//     }
// }

// const getCityToAirportMap = () => { // returns object map of cities to airports
//     const cityToAirportMap = {};
//     for (const location of locationsData) {
//         cityToAirportMap[location.city] = location.airport;
//     }
//     return cityToAirportMap;
// };

// const getAirportToCityMap = () => { // returns object map of airports to cities
//     const airportToCityMap = {};
//     for (const location of locationsData) {
//         airportToCityMap[location.airport] = location.city;
//     }
//     return airportToCityMap;
// };

// const getLocations = () => { // returns array of locations (cities and airports)
//     return locationsData
// }


// fetchLocationsData().then(locationsData => {
//     const cityToAirportMap = getAirportToCityMap(locationsData)
//     const airportToCityMap = getCityToAirportMap(locationsData)
//     const locations = getLocations(locationsData)
// })

// export { getAirportToCityMap, getCityToAirportMap, getLocations }
