import React, { useContext } from 'react'
import { LocationsContext } from "../context/locations"
import { useFormik } from 'formik'
import * as yup from 'yup'

function FlightSearch({ setFlight }){
    const { locations } = useContext(LocationsContext)

    const formSchema = yup.object().shape({
        origin: yup.string().required(),
        destination: yup.string().required(),
    })

    const handleSubmit = (values) => {
        // console.log(values)
        fetch('flight-query',{
            method:'POST',
            headers:{'Content-Type':'application/json'},
            body: JSON.stringify(values)
        })
            .then( r => { if(r.ok) r.json().then(flight => {
                // console.log(flight)
                setFlight(flight)
            })})
    }

    const formik = useFormik({
        initialValues: {origin:'',destination:''},
        validationSchema: formSchema,
        onSubmit: handleSubmit 
    })

    const airportOptions = locations.map( location => 
        <option key={location.id} value={location.id_code}>{location.city} | {location.id_code}</option>
    )

    if (!locations) return <div>Loading...</div>

    return( 
        <form onSubmit={formik.handleSubmit}>
            <label>Origin:</label>
                <input 
                    onChange={formik.handleChange}
                    type="text"
                    name="origin"
                    placeholder="origin..."
                    className="form-control"
                    list='airportOptions'
                    value={formik.values.origin}
                />
                <datalist id='airportOptions'>
                    {airportOptions}
                </datalist> 
                <p>{formik.errors.origin}</p>
            <label>Destination:</label>
                <input 
                    onChange={formik.handleChange}
                    type="text"
                    name="destination"
                    placeholder="destination..."
                    className="form-control"
                    list='airportOptions'
                    value={formik.values.destination}
                />
                <datalist id='airportOptions'>
                    {airportOptions}
                </datalist> 
                <p>{formik.errors.destination}</p>
            <button type='submit'>Search Flights</button>
        </form>
    )
}

export default FlightSearch