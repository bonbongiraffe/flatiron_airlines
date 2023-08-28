import React, { useState, useContext } from 'react'
import FlightSearch from './FlightSearch'
import SeatSelection from './SeatSelection'
import { UserContext } from '../context/user'

// const test = <div>{flight.origin} / {flight.destination}</div>

function CreateResForm({}){
    const [ flight, setFlight ] = useState(null)
    const [ reservation, setReservation ] = useState(null)
    const { user } = useContext(UserContext)

    if(reservation) return (
        <div>
            <p>Your flight is confirmed, {user.first_name}!</p>
            <p>Confirmation number: {reservation.conf_number}</p>
            <p>Thank you for flying with Unity!</p>
        </div>
    )

    return (
        <div>
            { flight ? <SeatSelection flight={flight} user={user} setReservation={setReservation}/> 
            : <FlightSearch setFlight={setFlight}/> }
        </div>
    )
}

export default CreateResForm