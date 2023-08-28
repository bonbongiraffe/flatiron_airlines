import React, { useState, useContext } from 'react'
import FlightSearch from './FlightSearch'
import SeatSelection from './SeatSelection'
import { UserContext } from '../context/user'

// const test = <div>{flight.origin} / {flight.destination}</div>

function CreateResForm({}){
    const [ flight, setFlight ] = useState(null)
    const [ reservations, setReservations ] = useState([])
    const [ type, setType ] = useState('round-trip')
    const { user } = useContext(UserContext)
    const typeKey = {'one-way':1,'round-trip':2}

    if(reservations.length === typeKey[type]) return (
        <div>
            <p>Your reservation is confirmed, {user.first_name}!</p>
            { type==='one-way' ? <p>Confirmation number: {reservations[0].conf_number}</p> : null }
            { type==='round-trip' ? <p>Confirmation numbers: outgoing - {reservations[0].conf_number}, returning - {reservations[1].conf_number}</p> : null }
            {/* <p>{'Confirmation number(s):'} {reservation.conf_number}</p> */}
            <p>Thank you for flying with Unity!</p>
        </div>
    )

    // if (!flight) return <div>Loading...</div>

    return (
        <div className="d-flex justify-content-center align-items-center vh-100">
            { (type==='one-way' && flight) ? <SeatSelection flight={flight} user={user} setReservations={setReservations}/> : null }
            { (type==='round-trip' && flight && reservations.length===0) ? <SeatSelection flight={flight.outgoing} user={user} setReservations={setReservations}/> : null }
            { (type==='round-trip' && flight && reservations.length===1) ? <SeatSelection flight={flight.returning} user={user} setReservations={setReservations}/> : null }
            {/* { flights ? <SeatSelection flights={flights} user={user} setReservations={setReservations}/> 
            : <FlightSearch setFlights={setFlights} type={type} setType={setType}/> } */}
            { flight ? null : <FlightSearch setFlight={setFlight} type={type} setType={setType}/> }
        </div>
    )
}

export default CreateResForm