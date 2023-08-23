import { useState, useContext, useEffect } from "react"
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
    },
    {
        city: "Hong Kong",
        airport: "HKG"
    },
]

const airportDict = {"Newark":"EWR","Boston":"BOS","Denver":"DEN","Munich":"MUC","Hong Kong":"HKG"}

const seatingChart = (openSeatslist=[]) => {
    const emptyPlane = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20]
    let chart = []
    for (let i = 0 ; i < 5 ; i++){ // <-- once for each row
        let row = []
        for (let j = i*4 ; j < (i*4)+4 ; j++){ // <-- once for each seat
            // console.log(j)
            if ( openSeatslist.includes(j+1) ){
                row.push(j+1)
            }
            else row.push('xx')
        }
        // console.log(row)
        chart.push(<li className="list-item">{`W | ${row[0].toString().padStart(2,'0')} ${row[1].toString().padStart(2,'0')} | A | ${row[2].toString().padStart(2,'0')} ${row[3].toString().padStart(2,'0')} | W`}</li>)
    }
    // console.log(chart)
    return chart
}

const openSeatingChart = <>
    <li className="list-item">W | 01 02 | A | 03 04 | W</li> 
    <li className="list-item">W | 05 06 | A | 07 08 | W</li> 
    <li className="list-item">W | 09 10 | A | 11 12 | W</li> 
    <li className="list-item">W | 13 14 | A | 15 16 | W</li> 
    <li className="list-item">W | 17 18 | A | 19 20 | W</li>
    </>

const seatingChartLegend = <ul className="list-unstyled">
    <li className="list-item">W = window</li>
    <li className="list-item">A = aisle</li>
</ul>

function ReservationForm({ isEdit=false, reservation={id:0, flight:{origin:"",destination:""}, seat:0}, setReservation=null }) {
    // console.log(reservation)
    seatingChart()
    const { user } = useContext(UserContext)
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

    // const cityOptions = Object.keys(airportDict).map( city => <option value={city}></option>)
    // console.log(Object.values(airportDict))
    useEffect(()=>{
        // console.log(formik.values)
        if (!!formik.values.origin && !!formik.values.destination){
            if (Object.values(airportDict).includes(formik.values.origin) && Object.values(airportDict).includes(formik.values.destination)){
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

    return(
        <div className="d-flex justify-content-center align-items-center vh-100">
            <form className="" style={{width:'30rem'}}onSubmit={formik.handleSubmit}>
                {(formik.isSubmitting && !error) ? <p>Reservation Confirmed!</p> : null }
                <div className="row">
                    <div className="col">
                        <label className="form-titles" htmlFor="origin">Origin:</label>
                            <input 
                                onChange= {formik.handleChange}
                                type="text"
                                name= "origin"
                                placeholder="origin..."
                                className="form-control"
                                value={formik.values.origin}
                                list="cities"
                            /><p>{formik.errors.origin}</p>
                    </div>
                    <div className="col">
                        <label className="form-titles" htmlFor="destination">Destination:</label>
                            <input 
                                onChange= {formik.handleChange}
                                type="text"
                                name= "destination"
                                placeholder="destination..."
                                className="form-control"
                                value={formik.values.destination}
                                list="cities"
                            /><p>{formik.errors.destination}</p>
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
                    { searchFlight ? seatingChart(searchFlight.open_seats) : openSeatingChart }
                </ul>
                {seatingChartLegend}
            </form>
        </div>
    )
}

export default ReservationForm