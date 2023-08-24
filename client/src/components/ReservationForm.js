import { useState, useContext, useEffect } from "react"
import { UserContext } from '../context/user'
import { LocationsContext } from "../context/locations"
import { useFormik } from "formik"
import AirportAutosuggest from "./AiportAutosuggest"
import * as yup from "yup"
import * as assets from "../assets"

function ReservationForm({ isEdit=false, reservation={id:0, flight:{origin:"",destination:""}, seat:0}, setReservation=null }) {
    const { user } = useContext(UserContext)
    const { airports } = useContext(LocationsContext)
    const [ error, setError ] = useState(null)
    const [ searchFlight, setSearchFlight ] = useState(null)

    useEffect(()=>{if (!isEdit) document.title='Flatlines | Create Reservation'},[])

    const formSchema = yup.object().shape({
        origin: yup.string().required(),
        destination: yup.string().required(),
        seat: yup.number().required().min(1).max(20)
    })

    const handleSubmit = (values) => {
        console.log(values)
        fetch('/reservations',{
            method: "POST",
            headers: {"Content-Type":"application/json"},
            body: JSON.stringify({...values, user_id:user.id})
        })
            .then( r => {
                if ( r.ok ){
                    // setSearchFlight({...searchFlight,open_seats: searchFlight.open_seats.})
                    setError(null)
                    // formik.resetForm()
                    // setSearchFlight(r.json())
                }
                else setError("Invalid Reservation Form")
            })
    }

    const handleEdit = (values) => {
        // console.log(values,reservation.id)
        fetch(`/reservations/${reservation.conf_number}`,{
            method: "PATCH",
            headers: {"Content-Type":"application/json"},
            body: JSON.stringify({...values})
        })
            .then( r => {
                if ( r.ok ){
                    // setSearchFlight({...searchFlight,open_seats: searchFlight.open_seats.})
                    setError(null)
                    // formik.resetForm()
                    // setSearchFlight(r.json())
                }
                else setError("Invalid Reservation Form")
            })
    }

    const formik = useFormik({
        initialValues: {...reservation.flight, seat: reservation.seat},
        validationSchema: formSchema,
        onSubmit: isEdit ? handleEdit : handleSubmit 
    })
    
    const handleCancel = (confNum) => {
        fetch(`reservations/${confNum}`,{
            method:"DELETE"
        })
        setReservation(null)
        // handleDelete(reservationId)
    }

    useEffect(()=>{
        console.log(airports)
        if (!!formik.values.origin && !!formik.values.destination){
            if (airports.includes(formik.values.origin) && airports.includes(formik.values.destination)){
                if (formik.values.origin === formik.values.destination){
                    setError("Origin and Destination cannot match")
                } else {
                    setError("")
                    fetch(`flights`)
                        .then( r => r.json())
                        .then( flights => {
                            flights.map( flight => {
                                if (flight.origin === formik.values.origin && flight.destination === formik.values.destination)
                                    setSearchFlight(flight)
                            })
                        })
                }
            } else {
                setError("Flight not found")
            }
        }
    },[formik.values, error])

    if (!airports) return <div>Loading...</div>

    return(
        <div className="d-flex justify-content-center align-items-center vh-100">
            <form className="" style={{}} onSubmit={formik.handleSubmit}>
                {(formik.isSubmitting && !error) ? <p>Reservation Confirmed!</p> : null }
                {/*IF form container has width attribute --> for below row div style={{'--bs-gutter-x': 'unset', 'padding-right': 'rem'}} */}
                <div className="row" >
                    <div className="col">
                        <label className="form-titles" htmlFor="origin">Origin:</label>
                            <AirportAutosuggest
                                name='origin'
                                placeholder='City or Airport name...'
                                onChange={formik.handleChange}
                                value={formik.values.origin}                 
                            />                     
                            <p>{formik.errors.origin}</p>                           
                    </div>
                    <div className="col">
                        <label className="form-titles" htmlFor="destination">Destination:</label>
                            <AirportAutosuggest
                                name='destination'
                                placeholder='City or Airport name...'
                                onChange={formik.handleChange}
                                value={formik.values.destination}                        
                            />                     
                            <p>{formik.errors.destination}</p>   
                    </div>
                </div>
                <label className="form-titles" htmlFor="seat">Seat:</label>
                    <input 
                        onChange= {formik.handleChange}
                        type="number"
                        name= "seat"
                        placeholder="seat..."
                        className="form-control"
                        value={formik.values.seat}
                        list="cities"
                    />
                    <p>{formik.errors.seat}</p>
                <button className="btn btn-primary" type='submit'>Reserve</button>
                { error ? <p>{error}</p> : null }
                { isEdit ? <button className="btn btn-danger" onClick={e => handleCancel(reservation.conf_number)}>Cancel</button> : null }
                <h3>Seating Chart</h3>
                <ul className="list-unstyled">
                    { searchFlight ? assets.renderSeatingChart(searchFlight.open_seats) : assets.openSeatingChart }
                </ul>
                {assets.seatingChartLegend}
            </form>
        </div>
    )
}

export default ReservationForm