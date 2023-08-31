import { useEffect, useState, useContext } from "react"
import { LocationsContext } from "../context/locations"
const airplaneEmoji = '\u2708'

function ReservationCard({ flightId, reservationId, seat, confNum }) {
    const [ flight, setFlight ] = useState({origin:"",destination:""})
    const { airportToCityMap } = useContext(LocationsContext)
    const [ isCopied, setIsCopied ] = useState(false)

    useEffect(()=>{
        fetch(`flights/${flightId}`)
            .then( r => r.json())
            .then( f => setFlight(f))
    },[flightId])
    
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

    const handleCopyToClipboard = () => {
        navigator.clipboard.writeText(confNum)
            .then(()=>{
                setIsCopied(true)
                setTimeout(()=>{setIsCopied(false)},2000)
            })
            .catch((error) => console.error('Failed to copy to clipboard:',error))
    }

    if (!airportToCityMap) return <div className="card" style={{width: '25rem'}}>Loading...</div>
    
    return(
        <div className="card border-dark m-1" style={{width:'20rem', backgroundColor:'rgb(255,255,255,0.8'}}>
            <div className='card-header'><b>Flight:</b> {flight.origin} <span style={{fontFamily: 'Arial, sans-serif'}}>{airplaneEmoji}</span> {flight.destination}</div>
            <div className='card-subtitle text-muted'>{airportToCityMap[flight.origin]} to {airportToCityMap[flight.destination]}</div>
            <div className='card-body'>
                <div className='card-text' onClick={()=>handleCopyToClipboard()}><b>Confirmation:</b> {confNum} <button className='btn btn-outline-dark' onClick={()=>handleCopyToClipboard()}>{ isCopied ? 'Copied!' : '📋' }</button></div>
                <div className='card-text mb-2'><b>Seat:</b> {seat}</div>
                <button className='btn btn-outline-primary' onClick={()=>downloadBoardingPass()}  style={{width:'13rem'}}>Download Boarding Pass</button>
            </div>
        </div>
    )
}

export default ReservationCard