import React, { useState, useContext } from 'react'
import FlightSearch from './FlightSearch'
import SeatSelection from './SeatSelection'
import { UserContext } from '../context/user'

function CreateResForm({}){
    const [ flight, setFlight ] = useState(null)
    const [ reservations, setReservations ] = useState([])
    const [ type, setType ] = useState('round-trip')
    const { user } = useContext(UserContext)
    const typeKey = {'one-way':1,'round-trip':2}

    if(reservations.length === typeKey[type]) return (
        <div className="container" style={{color:'white'}}>
            <p>Your reservation is confirmed, {user.first_name}!</p>
            { type==='one-way' ? <p>Confirmation number: {reservations[0].conf_number}</p> : null }
            { type==='round-trip' ? <p>Confirmation numbers: outgoing - {reservations[0].conf_number}, returning - {reservations[1].conf_number}</p> : null }
            <p>Thank you for flying with Flatiron!</p>
        </div>
    )

    return (
        <div className="container d-flex justify-content-center align-items-center">
            { (type==='one-way' && flight) ? <SeatSelection flight={flight} user={user} setReservations={setReservations}/> : null }
            { (type==='round-trip' && flight && reservations.length===0) ? <SeatSelection flight={flight.outgoing} user={user} setReservations={setReservations}/> : null }
            { (type==='round-trip' && flight && reservations.length===1) ? <SeatSelection flight={flight.returning} user={user} setReservations={setReservations}/> : null }
            { flight ? null : <FlightSearch setFlight={setFlight} type={type} setType={setType}/> }
        </div>
    )
}

export default CreateResForm