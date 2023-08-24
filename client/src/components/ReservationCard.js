import { useEffect, useState } from "react"
const airplaneEmoji = '\u2708'
//opposite for airportDict used in ReservationForm
const airportDict = {"EWR":"Newark","BOS":"Boston","DEN":"Denver","MUC":"Munich","HKG":"Hong Kong","JFK":"New York City"}

function ReservationCard({ flightId, reservationId, seat, confNum }) {
    const [ flight, setFlight ] = useState({origin:"",destination:""})

    useEffect(()=>{
        fetch(`flights/${flightId}`)
            .then( r => r.json())
            .then( f => setFlight(f))
    },[])
    
    return(
        <div className="card" style={{width: '20rem'}}>
            <h3 className="card-title">confirmation: {confNum}</h3>
            <h3>{airportDict[flight.origin]} to {airportDict[flight.destination]}</h3>
            <h3>{flight.origin} <span style={{fontFamily: 'Arial, sans-serif'}}>{airplaneEmoji}</span> {flight.destination}</h3>
            <h3>seat: {seat}</h3>
        </div>
    )
}

export default ReservationCard