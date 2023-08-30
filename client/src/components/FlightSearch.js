import React, { useContext } from 'react'
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
            <h4 className='mb-4'>Flight Search</h4>
            <div className='row mb-4'>
                <div className='col'>
                    <label style={{width:'20rem'}}>Origin:</label>
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
                    <p style={{minHeight:'2rem'}}>{formik.errors.origin ? formik.errors.origin : null}</p>
                </div>
                <div className='col'>
                    <fieldset className='mb-2'>
                        <div>
                            <input type='radio' id='one-way' name='type' checked={type==='one-way'} onChange={()=>toggleType()}/>
                            <label htmlFor='one-way'>One-way</label>
                        </div>
                        <div>
                            <input type='radio' id='round-trip' name='type' checked={type==='round-trip'} onChange={()=>toggleType()}/>
                            <label htmlFor='round-trip'>Round-trip</label>
                        </div>
                    </fieldset>
                    <button className=' btn btn-outline-secondary'onClick={()=>handleSwitch()} type='button'>⇆</button>
                </div>
                <div className='col'>
                    <label style={{width:'20rem'}}>Destination:</label>
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
                    <p style={{minHeight:'2rem'}}>{formik.errors.destination ? formik.errors.destination : null}</p>
                </div>
            </div>
            <button className='btn btn-outline-primary mb-3' type='submit'>Search Flights</button>
        </form>
    )
}

export default FlightSearch