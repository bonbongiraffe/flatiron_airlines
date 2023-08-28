import React, { useContext, useState } from 'react'
import { LocationsContext } from "../context/locations"
import { useFormik } from 'formik'
import * as yup from 'yup'

function FlightSearch({ setFlight, type, setType }){
    const { locations } = useContext(LocationsContext)

    const toggleType = () => {
        setType( type === 'round-trip' ? 'one-way' : 'round-trip')
    }

    const formSchema = yup.object().shape({
        origin: yup.string().required(),
        destination: yup.string().required(),
    })

    const handleSubmit = (values) => {
        // console.log(values)
        fetch('flight-query',{
            method:'POST',
            headers:{'Content-Type':'application/json'},
            body: JSON.stringify({...values,type:type})
        })
            .then( r => { if(r.ok) r.json().then(flight => {
                // console.log(flight)
                setFlight(flight)
            })})
        // if(type==='round-trip'){
            
        // }
    }

    const formik = useFormik({
        initialValues: {origin:'',destination:''},
        validationSchema: formSchema,
        onSubmit: handleSubmit 
    })

    const handleSwitch = () => {
        formik.setValues({
            origin: formik.values.destination,
            destination: formik.values.origin
        })
    }

    const airportOptions = locations.map( location => 
        <option key={location.id} value={location.id_code}>{location.city} | {location.id_code}</option>
    )

    if (!locations) return <div>Loading...</div>

    return( 
        <form onSubmit={formik.handleSubmit}>
            <div className='row'>
                <div className='col'>
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
                </div>
                <div className='col'>
                    <fieldset>
                        <div>
                            <input type='radio' id='one-way' name='type' checked={type==='one-way'} onChange={()=>toggleType()}/>
                            <label htmlFor='one-way'>One-way</label>
                        </div>
                        <div>
                            <input type='radio' id='round-trip' name='type' checked={type==='round-trip'} onChange={()=>toggleType()}/>
                            <label htmlFor='round-trip'>Round-trip</label>
                        </div>
                    </fieldset>
                    <button onClick={()=>handleSwitch()} type='button'>⇆</button>
                </div>
                <div className='col'>
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
                </div>
            </div>
            <button type='submit'>Search Flights</button>
        </form>
    )
}

export default FlightSearch