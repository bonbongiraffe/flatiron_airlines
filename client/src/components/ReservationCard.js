import { useEffect, useState, useContext } from "react"
import { LocationsContext } from "../context/locations"
const airplaneEmoji = '\u2708'
//opposite for airportDict used in ReservationForm
// const airportDict = {"EWR":"Newark","BOS":"Boston","DEN":"Denver","MUC":"Munich","HKG":"Hong Kong","JFK":"New York City"}

function ReservationCard({ flightId, reservationId, seat, confNum }) {
    const [ flight, setFlight ] = useState({origin:"",destination:""})
    const { airportToCityMap, cityToAirportMap, locations } = useContext(LocationsContext)

    useEffect(()=>{
        fetch(`flights/${flightId}`)
            .then( r => r.json())
            .then( f => setFlight(f))
    },[])
    
    const downloadBoardingPass = () => {
        // const pdfUrl = `/export-boarding-pass/${confNum}` <-- for deployment
        // const viewerUrl = `https://mozilla.github.io/pdf.js/web/viewer.html?file=${encodeURIComponent(pdfUrl)}`
        // window.open(viewerUrl,'_blank')
        fetch(`/export-boarding-pass/${confNum}`)
            .then( r => r.blob() )
            .then( blob => {
                console.log(blob)
                const url = URL.createObjectURL(blob)
                const a = document.createElement('a')
                a.href = url
                a.download = `${confNum}_boarding_pass.pdf`
                a.click()
                URL.revokeObjectURL(url)
            }) 
            .catch( error => {
                console.error('Error downloading boarding pass',error)
            })
    }

    if (!airportToCityMap) return <div className="card" style={{width: '25rem'}}>Loading...</div>

    // console.log( 'airport to city', airportToCityMap, 'city to airport', cityToAirportMap, 'locations', locations )
    
    return(
        <div className="card" style={{width: '25rem'}}>
            <h3 className="card-title">confirmation: {confNum}</h3>
            <h3>{airportToCityMap[flight.origin]} to {airportToCityMap[flight.destination]}</h3>
            <h3>{flight.origin} <span style={{fontFamily: 'Arial, sans-serif'}}>{airplaneEmoji}</span> {flight.destination}</h3>
            <h3>seat: {seat}</h3>
            <button onClick={()=>downloadBoardingPass()}>Download Boarding Pass</button>
        </div>
    )
}

export default ReservationCard