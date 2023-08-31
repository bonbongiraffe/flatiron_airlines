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
        <div className='mb-5 row'>
            <div className='col-3' style={{width:'15rem'}}>
                <h3 style={{color:'white'}}>Flight</h3>
                <p style={{color:'white'}}>Origin: {flight.origin}</p>
                <p style={{color:'white'}}>Destination: {flight.destination}</p>
                <h3 style={{color:'white'}}>Seating Chart</h3>
                {assets.seatingChartLegend}
            </div>
            <div className='col-6' style={{width:'25rem'}}>
                <SeatChart openSeatslist={flight.open_seats} selectedSeat={selectedSeat} setSelectedSeat={setSelectedSeat}/>
            </div>
            <div className='col' style={{minWidth:'15rem'}}>
                {selectedSeat ? <p style={{color:'white'}}>Seat {selectedSeat} selected</p> : null}
                {selectedSeat ? <button className='btn btn-primary' onClick={()=>handleSubmit()}>Reserve</button> : null}
            </div>
        </div>
    )
}

export default SeatSelection