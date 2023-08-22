import ReservationCard from "./ReservationCard"
import { useEffect, useState, useContext } from "react"
import { UserContext } from '../context/user'

function Home({  }) {
    const { user, setUser } = useContext(UserContext)
    const [ reservations, setReservations ] = useState([])
    //console.log("from Home.js", user)

    useEffect(()=>{
        // if (!user){
        //     fetch("/authorized")
        //     .then( r => {
        //     if (r.ok) {
        //       r.json().then( user => {
        //         setUser(user) 
        //         setReservations(user.reservations)
        //         }) } }) }
        // if (user) setReservations(user.reservations)
        fetch("/authorized")
            .then( r => {
            if (r.ok) {
              r.json().then( user => {
                setUser(user) 
                setReservations(user.reservations)
                // console.log(user.reservations)
                }) } }) 
    },[])

    // const handleDelete = (deletedId) => {
    //     setReservations(reservations.filter( reservation => reservation.id !== deletedId ))
    // }

    const renderedReservations = reservations.map( reservation => 
        <ReservationCard
            key = {reservation.id}
            reservationId = {reservation.id}
            flightId = {reservation.flight_id}
            seat = {reservation.seat}
    />)

    if (!user) return <h1>loading</h1>
    return(
        <div>
            {renderedReservations}
        </div>
    )
}

export default Home