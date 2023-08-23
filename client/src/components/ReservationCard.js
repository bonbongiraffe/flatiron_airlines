import { useEffect, useState } from "react"

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
            <h3>{flight.origin} {'—>'} {flight.destination}</h3>
            <h3>seat: {seat}</h3>
        </div>
    )
}

export default ReservationCard