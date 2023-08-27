import React, { useState, useContext } from 'react'
import { UserContext } from '../context/user'
import { useFormik } from 'formik'
import * as yup from 'yup'

function EditResForm(){
    const [ reservation, setReservation ] = useState(null)
    const [ confirmed, setConfirmed ] = useState(false)
    const { user } = useContext(UserContext)
    const [ editSeat, setEditSeat ] = useState(false)

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
                    r.json().then( r => {
                        if (r.user_id === user.id) setReservation(r)
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

    const editFormSchema = yup.object().shape({
        seat: yup.number().min(1).max(20).required()
    })

    const handleEdit = (values) => {
        // console.log(values,reservation.id)
        fetch(`/reservations/${reservation.id}`,{
            method: "PATCH",
            headers: {"Content-Type":"application/json"},
            body: JSON.stringify({...values})
        })
            .then( r => {
                if ( r.ok ){
                    // setSearchFlight({...searchFlight,open_seats: searchFlight.open_seats.})
                    setConfirmed(true)
                    // formik.resetForm()
                    // setSearchFlight(r.json())
                }
                // else setError("Invalid Reservation Form")
            })
    }

    const formikEdit = useFormik({
        initialValues: {seat:null},
        validationSchema: editFormSchema,
        onSubmit: handleEdit
    })

    const handleCancel = () => {
        fetch(`reservations/${reservation.id}`,{
            method:"DELETE"
        })
        setReservation(null)
        setConfirmed(true)
        // handleDelete(reservationId)
    }

    return (
        <div>
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
                <form onSubmit={formikEdit.handleSubmit} style={{width:'30rem'}}>
                <p>Origin: {reservation.flight.origin}</p>
                <p>Destination: {reservation.flight.destination}</p>
                <label>Seat:</label>
                    <input 
                        onChange={formikEdit.handleChange}
                        type="number"
                        name="seat"
                        placeholder="seat..."
                        className="form-control-plaintext"
                        value={editSeat ? formikEdit.values.seat : reservation.seat}
                    />
                    <p>{formikEdit.errors.seat}</p>
                    <button onClick={() => setEditSeat(true)}>Change Seat</button>
                    { editSeat ? <button type='submit'>Revise Reservation</button> : null}
                    <button onClick={() => handleCancel()}>Cancel Reservation</button>
                </form> : null}
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