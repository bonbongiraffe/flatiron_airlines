export const openSeatingChart = <>
    <li className="list-item">W | 01 02 | A | 03 04 | W</li> 
    <li className="list-item">W | 05 06 | A | 07 08 | W</li> 
    <li className="list-item">W | 09 10 | A | 11 12 | W</li> 
    <li className="list-item">W | 13 14 | A | 15 16 | W</li> 
    <li className="list-item">W | 17 18 | A | 19 20 | W</li>
    </>

export const seatingChartLegend = <ul className="list-unstyled">
        <li className="list-item">W = window</li>
        <li className="list-item">A = aisle</li>
    </ul>

export const renderSeatingChart = (openSeatslist=[]) => {
    // const emptyPlane = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20]
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

export const newSeatingChart = (openSeatslist=[]) => {
    // const seatButton = {width:'2em'}
    let renderedRows = []
    for (let i = 0 ; i < 5 ; i++){ // <-- once for each row
        let renderedSeats = []
        for (let j = i*4 ; j < (i*4)+4 ; j++){ // <-- once for each seat
            // console.log(j)
            let seat = <button className='col'>default</button>
            if ( openSeatslist.includes(j+1) ){
                // console.log('seat in!')
                seat = <button className='col'>{j+1}</button>
            } else {
            seat = <button className='col'>xx</button>
            }
            if (j === (i*4)+2) renderedSeats.push(<div className='col'>A</div>)
            renderedSeats.push(seat)
        }
        // console.log(row)
        let renderedRow = <div className='row'>
            <div className='col'>W</div>
            {renderedSeats}
            <div className='col'>W</div>
        </div>
        renderedRows.push(renderedRow)
    }
    // console.log(chart)
    return <div className=''>{renderedRows}</div>
}
