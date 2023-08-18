import { useEffect, useState } from "react"

function ReservationCard({ flightId, reservationId, handleDelete }) {
    const [ flight, setFlight ] = useState({origin:"",destination:""})

    useEffect(()=>{
        fetch(`flights/${flightId}`)
            .then( r => r.json())
            .then( f => setFlight(f))
    },[])

    const handleCancel = () => {
        fetch(`reservations/${reservationId}`,{
            method:"DELETE"
        })
        handleDelete(reservationId)
    }
    
    return(
        <div className="reservation-card">
            {/* <p>placeholder</p> */}
            <h3>reservation #: {reservationId}</h3>
            <h3>origin: {flight.origin}</h3>
            <h3>destination: {flight.destination}</h3>
            <button onClick={handleCancel}>Cancel</button>
        </div>
    )
}

export default ReservationCard