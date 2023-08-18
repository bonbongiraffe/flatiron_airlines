import { useState, useContext } from "react"
import { UserContext } from '../context/user'
import { useFormik } from "formik"
import * as yup from "yup"
// import Autosuggest from "react-autosuggest"

const airportCities = [
    {
        city: "Newark",
        airport: "EWR"
    },
    {
        city: "Boston",
        airport: "BOS"
    },
    {
        city: "Denver",
        airport: "DEN"
    },
    {
        city: "Munich",
        airport: "MUC"
    },{
        city: "Hong Kong",
        airport: "HKG"
    },
]
const airportDict = {"Newark":"EWR","Boston":"BOS","Denver":"DEN","Munich":"MUC","Hong Kong":"HKG"}

function ReservationForm({ isEdit=false, reservation={origin:"",destination:""} }) {
    console.log(reservation)
    const { user } = useContext(UserContext)

    const formSchema = yup.object().shape({
        origin: yup.string().required(),
        destination: yup.string().required()
    })

    const handleSubmit = (values) => {
        fetch('/reservations',{
            method: "POST",
            headers: {"Content-Type":"application/json"},
            body: JSON.stringify({...values, user_id:user.id})
        })
            .then( r => {
                if ( r.ok ){
                    r.json().then(console.log())
                }
            })
    }

    const handleEdit = (values) => {
        console.log(values)
        fetch(`/reservations/${reservation.id}`,{
            method: "PATCH",
            headers: {"Content-Type":"application/json"},
            body: JSON.stringify({...values})
        })
            .then( r => {
                if ( r.ok ){
                    r.json().then(console.log())
                }
            })
    }

    const formik = useFormik({
        initialValues: reservation,
        validationSchema: formSchema,
        onSubmit: isEdit ? handleEdit : handleSubmit 
    })

    // const cityOptions = Object.keys(airportDict).map( city => <option value={city}></option>)

    return(
        <div>
            <form onSubmit={formik.handleSubmit}>
                <label className="form-titles" htmlFor="origin">Origin:</label>
                    <input 
                        onChange= {formik.handleChange}
                        type="text"
                        name= "origin"
                        placeholder="origin..."
                        className="input-text"
                        value={formik.values.origin}
                        list="cities"
                    />
                    <p>{formik.errors.origin}</p>
                <label className="form-titles" htmlFor="destination">Destination:</label>
                    <input 
                        onChange= {formik.handleChange}
                        type="text"
                        name= "destination"
                        placeholder="destination..."
                        className="input-text"
                        value={formik.values.destination}
                        list="cities"
                    />
                    <p>{formik.errors.destination}</p>
                <button type='submit'>Reserve</button>
            </form>
        </div>
    )
}

export default ReservationForm