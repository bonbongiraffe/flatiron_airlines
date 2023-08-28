import React, { useState, useContext } from 'react'
import FlightSearch from './FlightSearch'
import SeatSelection from './SeatSelection'
import { UserContext } from '../context/user'

// const test = <div>{flight.origin} / {flight.destination}</div>

function CreateResForm({}){
    const [ flights, setFlights ] = useState([])
    const [ reservations, setReservations ] = useState([])
    const [ type, setType ] = useState('round-trip')
    const { user } = useContext(UserContext)
    const typeKey = {'one-way':1,'round-trip':2}

    // if(reservation) return (
    //     <div>
    //         <p>Your reservation is confirmed, {user.first_name}!</p>
    //         <p>{'Confirmation number(s):'} {reservation.conf_number}</p>
    //         <p>Thank you for flying with Unity!</p>
    //     </div>
    // )

    return (
        <div className="d-flex justify-content-center align-items-center vh-100">
            {/* { flights ? <SeatSelection flights={flights} user={user} setReservations={setReservations}/> 
            : <FlightSearch setFlights={setFlights} type={type} setType={setType}/> } */}
            <FlightSearch setFlights={setFlights} type={type} setType={setType}/>
        </div>
    )
}

export default CreateResForm