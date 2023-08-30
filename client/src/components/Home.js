import React, { useContext, useState, useEffect } from 'react'
import { LocationsContext } from "../context/locations"
// import * as photos from '../assets/locations'
import brussels from '../assets/locations/brussels-01.JPG'
import tokyo from '../assets/locations/tokyo-01.JPG'
import vancouver from '../assets/locations/vancouver-01.JPG'
import hongkong from '../assets/locations/hongkong-01.JPG'

import { ReactComponent as WorldMap } from '../assets/worldmap.svg'

function Home(){
    const { locations } = useContext(LocationsContext)
    const [ photoIndex, setPhotoIndex ] = useState(0)
    const photoPaths = [
        '../assets/locations/brussels-01.JPG',
        '../assets/locations/denver-01.JPG',
        '../assets/locations/hongkong-01.JPG',
        '../assets/locations/munich-01.JPG',
        '../assets/locations/tokyo-01.JPG',
        '../assets/locations/vancouver-01.JPG'
    ]

    const photos = [
        {
            path: brussels,
            name: 'Delirium Cafe',
            location: 'Brussesl, Belgium (BRU)'
        },
        {
            path: tokyo,
            name: 'National Garden',
            location: 'Tokyo, Japan (HND)'
        },
        {
            path: vancouver,
            name: 'Science Museum',
            location: 'Vancouver, Canada (YVR)'
        },
        {
            path: hongkong,
            name: 'Art Museum Postcard',
            location: 'Hong Kong, Hong Kong (HKG)'
        }
    ]

    const locationItems = locations.map( 
        location => <li key={location.id}><em>{location.city}:</em> <b>{location.id_code}</b></li>
    )
    
    useEffect(()=>{
        const interval = setInterval(() => {
            setPhotoIndex(prevIndex => (prevIndex + 1) % photos.length);
          }, 5000); // Change photo every 5 seconds
    
        return () => clearInterval(interval);
    },[])

    return( 
        <div id='home' className='container'>
            <div id='about' className='card bg-light m-2'>
                <div className='card-header'>About</div>
                <div className='card-text'>
                    Flatiron Airlines is a premiere airline company founded in 2023, serving twenty-four airports globally, across North America, Europe, and Asia.
                    Proud to connect you to the world! 
                </div>
            </div>
            <div className='row'>
                <div id='photos' className='card bg-light col m-1' style={{width:'35rem', height:'18rem'}}>
                    <img className='card-img-top' src={photos[photoIndex].path} alt=''/>
                    <div className='card-body'>
                        <div className='card-header'>{photos[photoIndex].name}</div>
                        <div className='card-text'>{photos[photoIndex].location}</div>
                    </div>
                </div>
                <div id='map' className='col'>
                    <WorldMap style={{height:'25rem',width:'38rem'}}/>
                </div>
                <div id='locations' className='card bg-light col-5 m-1' style={{width:'13rem', maxHeight:'25rem'}}>
                    <div className='card-header'>Locations</div>
                    <div className='card-body overflow-auto' style={{listStyleType:'none'}}>
                        {locationItems}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Home