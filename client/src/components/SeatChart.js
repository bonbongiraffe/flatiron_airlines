import React from 'react'
import { newOpenSeatList, exitAisle } from '../assets'

function SeatChart({openSeatslist=[], selectedSeat, setSelectedSeat}){
    let renderedRows = []
    for (let i = 0 ; i < 10 ; i++){ // <-- once for each row
        let renderedSeats = []
        for (let j = i*4 ; j < (i*4)+4 ; j++){ // <-- once for each seat
            // console.log(j)
            let seat = <button key='seat-default' className='col'>default</button>
            if ( openSeatslist.includes(newOpenSeatList[j]) ){
                if(newOpenSeatList[j] === selectedSeat) seat = <button key={`seat-${j+1}`} className='col btn btn-success' onClick={()=>setSelectedSeat(newOpenSeatList[j])}>{newOpenSeatList[j]}</button>
                else seat = <button style={{width:'4rem'}}key={`seat-${j+1}`} className='col btn btn-outline-light' onClick={()=>setSelectedSeat(newOpenSeatList[j])}>{newOpenSeatList[j]}</button>
            } else {
            seat = <button key={`seat-taken-${j+1}`} className='col btn btn-outline-danger' disabled>X</button>
            }
            if (j === (i*4)+2) renderedSeats.push(<div key='aisle' className='col' style={{color:'white'}}>A</div>)
            renderedSeats.push(seat)
        }
        // console.log(row)
        let renderedRow = <div key={`row-${i+1}`}className='row'>
            <div key='left-window' className='col' style={{color:'white'}}>W</div>
            {renderedSeats}
            <div key='right-window' className='col' style={{color:'white'}}>W</div>
        </div>
        renderedRows.push(renderedRow)
        if(i === 4 ) renderedRows.push(exitAisle)
    }
    
    return (
        <div className='container m-3 bg-dark'>{renderedRows}</div>
    )
}

export default SeatChart