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
        confNum: yup.string().required()
    })

    const handleSearch = (values) => {
        fetch(`/reservations/${values.confNum}`)
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
            confNum: ""
        },
        validationSchema: formSchema,
        onSubmit: handleSearch
    })
    
    return (
        <div className='form'>
            { reservation ?
            <ReservationForm isEdit={true} reservation={reservation} setReservation={setReservation}/>
            :
            <form onSubmit={formikSearch.handleSubmit}>
                { error ? <p>{error}</p> : null }
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
            </form>
            }
        </div>
    )
}

export default ReservationManager