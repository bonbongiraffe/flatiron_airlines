import ReservationCard from "./ReservationCard"
import { useEffect, useState, useContext } from "react"
import { UserContext } from '../context/user'

function MyFlights({  }) {
    const { user, setUser } = useContext(UserContext)
    const [ reservations, setReservations ] = useState([])

    useEffect(()=>{
        document.title = 'Flatlines | MyFlights'
        fetch("/authorized")
            .then( r => {
            if (r.ok) {
              r.json().then( user => {
                setUser(user) 
                setReservations(user.reservations)
                }) } }) 
    },[])

    const renderedReservations = reservations.map( reservation => 
        <ReservationCard
            key = {reservation.id}
            reservationId = {reservation.id}
            flightId = {reservation.flight_id}
            seat = {reservation.seat}
            confNum = {reservation.conf_number}
    />)

    if (!user) return <h1>loading</h1>

    return(
        <div className='container d-flex justify-content-center align-items-center'>
            {reservations.length === 0 ? <div style={{color:'white'}}>You have no upcoming flights</div> : null}
            {renderedReservations}
        </div>
    )
}

export default MyFlights