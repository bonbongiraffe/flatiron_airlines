import React, { useState, useContext } from 'react'
import { UserContext } from '../context/user'
import { useFormik } from 'formik'
import * as yup from 'yup'
import * as assets from "../assets"
import SeatChart from './SeatChart'

function EditResForm(){
    const [ reservation, setReservation ] = useState(null)
    const [ flight, setFlight ] = useState(null)
    const [ confirmed, setConfirmed ] = useState(false)
    const { user } = useContext(UserContext)
    const [ editSeat, setEditSeat ] = useState(false)
    const [ selectedSeat, setSelectedSeat ] = useState(null)

    const searchFormSchema = yup.object().shape({
        confNum: yup.string().required()
    })

    const handleSearch = (values) => {
        fetch(`/reservation-query`,{
            method: 'POST',
            headers: {'Content-Type':'application/json'},
            body: JSON.stringify({...values, user_id:user.id})
        })
            .then( r => {
                if ( r.ok ){
                    r.json().then( reservation => {
                        if (reservation.user_id === user.id) {
                            setReservation(reservation)
                            fetch(`/flights/${reservation.flight_id}`)
                                .then( r => r.json()).then(flight => setFlight(flight))
                        }
                        // else setError("Reservation does not exist for current user")
                    })
                }
                // else setError("Reservation does not exist for current user") //<-- need to revisit this
            })
    }

    const formikSearch = useFormik({
        initialValues:{
            confNum: ""
        },
        validationSchema: searchFormSchema,
        onSubmit: handleSearch
    })

    const handleSubmit = () => {
        // console.log({...values, flight_id:flight.id, user_id:user.id})
        fetch(`reservations/${reservation.id}`,{
            method: 'PATCH',
            headers: {'Content-type':'application/json'},
            body: JSON.stringify({seat:selectedSeat})
        })
            .then( r => {
                if(r.ok) setConfirmed(true)
            })
    }

    const handleCancel = () => {
        fetch(`reservations/${reservation.id}`,{
            method:"DELETE"
        })
        setReservation(null)
        setConfirmed(true)
    }

    return (
        <div className="d-flex justify-content-center align-items-center vh-100">
            {/* need to search for reservation */}
            { (!reservation && !confirmed) ? 
            <form onSubmit={formikSearch.handleSubmit}>
            <label className="form-titles" htmlFor="confirmation-number">Confirmation #:</label>
                <input 
                    onChange= {formikSearch.handleChange}
                    type="text"
                    name= "confNum"
                    placeholder="confirmation number..."
                    className="form-control"
                    value={formikSearch.values.confNum}
                />
                <p>{formikSearch.errors.confNum}</p>
                <button type='submit'>Edit</button>
            </form> : null }
            {/* // editing reservation */}
            { (reservation && !confirmed) ? 
                <div className=''>
                    <p>Passenger: {reservation.user.first_name} {reservation.user.last_name}</p>
                    <p>Origin: {reservation.flight.origin}</p>
                    <p>Destination: {reservation.flight.destination}</p>
                    <p>Confirmation: {reservation.conf_number}</p>
                    { editSeat ? 
                    <div>
                        <h3>Seating Chart</h3>
                        {assets.seatingChartLegend}
                        <SeatChart openSeatslist={flight.open_seats} selectedSeat={selectedSeat} setSelectedSeat={setSelectedSeat}/>
                        {selectedSeat ? <p>Seat {selectedSeat} selected</p> : null}
                        {selectedSeat ? <button onClick={()=>handleSubmit()}>Revise Reservation</button> : null}
                    </div> : <p>Seat: {reservation.seat}</p>}
                    { editSeat ? null : <button onClick={() => setEditSeat(true)}>Change Seat</button>}
                    <button onClick={() => handleCancel()}>Cancel Reservation</button>
                </div> : null }
            {/* // after successful edit */}
            { (reservation && confirmed) ? 
            <div>
                <p>Your reservation has been revised.</p>
                <p>Thank you for flying with Unity!</p>
            </div> : null }
            {/* // after successful cancellation */}
            { (!reservation && confirmed) ? 
            <div>
                <p>Your reservation has been cancelled.</p>
                <p>We hope to see you again soon!</p>
            </div> : null }
        </div>
    )
}

export default EditResForm