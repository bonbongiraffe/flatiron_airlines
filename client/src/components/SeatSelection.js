import React, { useState } from 'react'
// import { useFormik } from 'formik'
// import * as yup from 'yup'
// import SeatChart from './SeatChart'
import * as assets from "../assets"
import SeatChart from './SeatChart'

function SeatSelection({ flight, user, setReservation }){
    const [ selectedSeat, setSelectedSeat ] = useState(null)

    // const formSchema = yup.object().shape({
    //     seat: yup.number().required().min(1).max(20)
    // })

    // const handleSubmit = (values) => {
    //     console.log({...values, flight_id:flight.id, user_id:user.id})
    //     fetch('reservations',{
    //         method: 'POST',
    //         headers: {'Content-type':'application/json'},
    //         body: JSON.stringify({...values, flight_id:flight.id, user_id:user.id})
    //     })
    //         .then( r => {
    //             if(r.ok) r.json().then(reservation => setReservation(reservation))
    //         })
    // }
    const handleSubmit = () => {
            // console.log({...values, flight_id:flight.id, user_id:user.id})
            fetch('reservations',{
                method: 'POST',
                headers: {'Content-type':'application/json'},
                body: JSON.stringify({seat:selectedSeat, flight_id:flight.id, user_id:user.id})
            })
                .then( r => {
                    if(r.ok) r.json().then(reservation => setReservation(reservation))
                })
        }

    // const formik = useFormik({
    //     initialValues: {seat:null},
    //     validationSchema: formSchema,
    //     onSubmit: handleSubmit
    // })

    // let renderedRows = []
    // for (let i = 0 ; i < 5 ; i++){ // <-- once for each row
    //     let renderedSeats = []
    //     for (let j = i*4 ; j < (i*4)+4 ; j++){ // <-- once for each seat
    //         // console.log(j)
    //         let seat = <button key='seat-default' className='col'>default</button>
    //         if ( flight.open_seats.includes(j+1) ){
    //             // console.log('seat in!')
    //             seat = <button key={`seat-${j+1}`} className='col' onClick={()=>setSelectedSeat(j+1)}>{j+1}</button>
    //         } else {
    //         seat = <button key='seat-taken' className='col'>xx</button>
    //         }
    //         if (j == (i*4)+2) renderedSeats.push(<div key='aisle' className='col'>A</div>)
    //         renderedSeats.push(seat)
    //     }
    //     // console.log(row)
    //     let renderedRow = <div key={`row-${i+1}`}className='row'>
    //         <div key='left-window' className='col'>W</div>
    //         {renderedSeats}
    //         <div key='right-window' className='col'>W</div>
    //     </div>
    //     renderedRows.push(renderedRow)
    // }
    return (
        <div className=''>
            <p>Origin: {flight.origin} - Destination: {flight.destination}</p>
            <h3>Seating Chart</h3>
            {assets.seatingChartLegend}
            <SeatChart openSeatslist={flight.open_seats} selectedSeat={selectedSeat} setSelectedSeat={setSelectedSeat}/>
            {selectedSeat ? <p>Seat {selectedSeat} selected</p> : null}
            {selectedSeat ? <button onClick={()=>handleSubmit()}>Reserve</button> : null}
        </div>
    )

    // return (
    //     <form onSubmit={formik.handleSubmit}>
    //         <label>Seat:</label>
    //             <input 
    //                 onChange={formik.handleChange}
    //                 type="number"
    //                 name="seat"
    //                 placeholder="seat..."
    //                 className="form-control"
    //                 // value={formik.values.seat}
    //                 value={selectedSeat}
    //             />
    //             <p>{formik.errors.seat}</p>
    //             <button type='submit'>Reserve</button>
    //             <h3>Seating Chart</h3>
    //             <SeatChart openSeatslist={flight.open_seats} selectedSeat={selectedSeat} setSelectedSeat={setSelectedSeat}/>
    //             {/* <ul className="list-unstyled">
    //                 {assets.renderSeatingChart(flight.open_seats)}
    //             </ul> */}
    //             {assets.seatingChartLegend}
    //             {/* {assets.newSeatingChart(flight.open_seats)} */}
    //     </form>
    // )
}

export default SeatSelection