import React from 'react'
import { useFormik } from 'formik'
import * as yup from 'yup'
import * as assets from "../assets"

function SeatSelection({ flight, user, setReservation }){
    const formSchema = yup.object().shape({
        seat: yup.number().required().min(1).max(20)
    })

    const handleSubmit = (values) => {
        console.log({...values, flight_id:flight.id, user_id:user.id})
        fetch('reservations',{
            method: 'POST',
            headers: {'Content-type':'application/json'},
            body: JSON.stringify({...values, flight_id:flight.id, user_id:user.id})
        })
            .then( r => {
                if(r.ok) r.json().then(reservation => setReservation(reservation))
            })
    }

    const formik = useFormik({
        initialValues: {seat:null},
        validationSchema: formSchema,
        onSubmit: handleSubmit
    })

    return (
        <form onSubmit={formik.handleSubmit}>
            <label>Seat:</label>
                <input 
                    onChange={formik.handleChange}
                    type="number"
                    name="seat"
                    placeholder="seat..."
                    className="form-control"
                    value={formik.values.seat}
                />
                <p>{formik.errors.seat}</p>
                <button type='submit'>Reserve</button>
                <h3>Seating Chart</h3>
                <ul className="list-unstyled">
                    {assets.renderSeatingChart(flight.open_seats)}
                </ul>
                {assets.seatingChartLegend}
        </form>
        
    )
}

export default SeatSelection