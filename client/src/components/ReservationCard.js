import { useEffect, useState } from "react"

function ReservationCard({ flightId, reservationId, seat }) {
    const [ flight, setFlight ] = useState({origin:"",destination:""})

    useEffect(()=>{
        fetch(`flights/${flightId}`)
            .then( r => r.json())
            .then( f => setFlight(f))
    },[])
    
    return(
        <div className="reservation-card">
            {/* <p>placeholder</p> */}
            <h3>reservation #: {reservationId}</h3>
            <h3>origin: {flight.origin}</h3>
            <h3>destination: {flight.destination}</h3>
            <h3>seat: {seat}</h3>
        </div>
    )
}

export default ReservationCard