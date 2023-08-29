import React, { useState } from 'react'
import * as assets from "../assets"
import SeatChart from './SeatChart'

function SeatSelection({ flight, user, setReservations }){
    const [ selectedSeat, setSelectedSeat ] = useState(null)

    const handleSubmit = () => {
        // console.log({...values, flight_id:flight.id, user_id:user.id})
        fetch('reservations',{
            method: 'POST',
            headers: {'Content-type':'application/json'},
            body: JSON.stringify({seat:selectedSeat, flight_id:flight.id, user_id:user.id})
        })
            .then( r => {
                if(r.ok) r.json().then(newReservation => setReservations(reservation => [...reservation, newReservation]))
            })
    }

    return (
        <div className=''>
            <p>Origin: {flight.origin} - Destination: {flight.destination}</p>
            <h3>Seating Chart</h3>
            {assets.seatingChartLegend}
            <SeatChart openSeatslist={flight.open_seats} selectedSeat={selectedSeat} setSelectedSeat={setSelectedSeat}/>
            {selectedSeat ? <p>Seat {selectedSeat} selected</p> : null}
            {selectedSeat ? <button onClick={()=>handleSubmit()}>Reserve</button> : null}
        </div>
    )
}

export default SeatSelection