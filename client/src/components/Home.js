import ReservationCard from "./ReservationCard"
import { useEffect, useState } from "react"

function Home({ user }) {
    console.log("from Home.js",user)
    const [ reservations, setReservations ] = useState(user.reservations)

    const handleDelete = (deletedId) => {
        setReservations(reservations.filter( reservation => reservation.id !== deletedId ))
    }

    const renderedReservations = reservations.map( reservation => 
        <ReservationCard
            key = {reservation.id}
            reservationId = {reservation.id}
            flightId = {reservation.flight_id}
            handleDelete = {handleDelete}
    />)

    return(
        <div>
            {renderedReservations}
        </div>
    )
}

export default Home