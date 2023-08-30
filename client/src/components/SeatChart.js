import React from 'react'

function SeatChart({openSeatslist=[], selectedSeat, setSelectedSeat}){
    let renderedRows = []
    for (let i = 0 ; i < 5 ; i++){ // <-- once for each row
        let renderedSeats = []
        for (let j = i*4 ; j < (i*4)+4 ; j++){ // <-- once for each seat
            // console.log(j)
            let seat = <button key='seat-default' className='col'>default</button>
            if ( openSeatslist.includes(j+1) ){
                if((j+1) === selectedSeat) seat = <button key={`seat-${j+1}`} className='col btn btn-success' onClick={()=>setSelectedSeat(j+1)}>{j+1}</button>
                else seat = <button key={`seat-${j+1}`} className='col btn btn-outline-secondary' onClick={()=>setSelectedSeat(j+1)}>{j+1}</button>
            } else {
            seat = <button key={`seat-taken-${j+1}`} className='col btn btn-outline-danger' disabled>X</button>
            }
            if (j === (i*4)+2) renderedSeats.push(<div key='aisle' className='col'>A</div>)
            renderedSeats.push(seat)
        }
        // console.log(row)
        let renderedRow = <div key={`row-${i+1}`}className='row'>
            <div key='left-window' className='col'>W</div>
            {renderedSeats}
            <div key='right-window' className='col'>W</div>
        </div>
        renderedRows.push(renderedRow)
    }
    
    return (
        <div className=''>{renderedRows}</div>
    )
}

export default SeatChart