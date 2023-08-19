import { useState, useContext } from "react"
import { UserContext } from '../context/user'
import { useFormik } from "formik"
import * as yup from "yup"
import ReservationForm from "./ReservationForm"

function ReservationManager(){
    const { user } = useContext(UserContext)
    const [ reservation, setReservation ] = useState(null)
    const [ error, setError ] = useState(null)

    const formSchema = yup.object().shape({
        reservationId: yup.number().required()
    })

    const handleSearch = (values) => {
        fetch(`/reservations/${values.reservationId}`)
            .then( r => {
                if ( r.ok ){
                    r.json().then( r => {
                        if (r.user_id === user.id) setReservation(r)
                        else setError("Reservation does not exist for current user")
                    })
                }
                else setError("Reservation does not exist for current user") //<-- need to revisit this
            })
    }

    const formikSearch = useFormik({
        initialValues:{
            reservationId: 0
        },
        validationSchema: formSchema,
        onSubmit: handleSearch
    })
    
    return (
        <div className='reservation-manager'>
            { reservation ?
            <ReservationForm isEdit={true} reservation={reservation}/>
            :
            <form onSubmit={formikSearch.handleSubmit}>
                { error ? <p>{error}</p> : null }
                <label className="form-titles" htmlFor="reservation-id">Reservation #:</label>
                    <input 
                        onChange= {formikSearch.handleChange}
                        type="text"
                        name= "reservationId"
                        placeholder="reservationId..."
                        className="input-text"
                        value={formikSearch.values.reservationId}
                    />
                    <p>{formikSearch.errors.reservationId}</p>
                    <button type='submit'>Edit</button>
            </form>
            }
        </div>
    )
}

export default ReservationManager