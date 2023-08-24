import { useEffect, useState, useContext } from "react"
import { LocationsContext } from "../context/locations"
const airplaneEmoji = '\u2708'
//opposite for airportDict used in ReservationForm
// const airportDict = {"EWR":"Newark","BOS":"Boston","DEN":"Denver","MUC":"Munich","HKG":"Hong Kong","JFK":"New York City"}

function ReservationCard({ flightId, reservationId, seat, confNum }) {
    const [ flight, setFlight ] = useState({origin:"",destination:""})
    const { airportToCityMap, cityToAirportMap, locations } = useContext(LocationsContext)

    useEffect(()=>{
        fetch(`flights/${flightId}`)
            .then( r => r.json())
            .then( f => setFlight(f))
    },[])
    
    if (!airportToCityMap) return <div className="card" style={{width: '25rem'}}>Loading...</div>

    // console.log( 'airport to city', airportToCityMap, 'city to airport', cityToAirportMap, 'locations', locations )
    
    return(
        <div className="card" style={{width: '25rem'}}>
            <h3 className="card-title">confirmation: {confNum}</h3>
            <h3>{airportToCityMap[flight.origin]} to {airportToCityMap[flight.destination]}</h3>
            <h3>{flight.origin} <span style={{fontFamily: 'Arial, sans-serif'}}>{airplaneEmoji}</span> {flight.destination}</h3>
            <h3>seat: {seat}</h3>
        </div>
    )
}

export default ReservationCard