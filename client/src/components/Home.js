import React, { useContext, useState, useEffect } from 'react'
import { LocationsContext } from "../context/locations"
// import * as photos from '../assets/locations'
import brussels from '../assets/locations/brussels-01.JPG'
import tokyo from '../assets/locations/tokyo-01.JPG'
import vancouver from '../assets/locations/vancouver-01.JPG'
import hongkong from '../assets/locations/hongkong-01.JPG'
import munich from '../assets/locations/munich-01.JPG'
import denver from '../assets/locations/denver-01.JPG'
import pin from '../assets/pin.png'
import '../styling/Home.css'

import { ReactComponent as WorldMap } from '../assets/worldmap.svg'

function Home(){
    const { locations } = useContext(LocationsContext)
    const [ photoIndex, setPhotoIndex ] = useState(0)
    // const photoPaths = [
    //     '../assets/locations/brussels-01.JPG',
    //     '../assets/locations/denver-01.JPG',
    //     '../assets/locations/hongkong-01.JPG',
    //     '../assets/locations/munich-01.JPG',
    //     '../assets/locations/tokyo-01.JPG',
    //     '../assets/locations/vancouver-01.JPG'
    // ]

    const photos = [
        {
            path: brussels,
            name: 'Delirium Cafe',
            location: 'Brussels, Belgium (BRU)'
        },
        {
            path: tokyo,
            name: 'Meiji Jingu Forest',
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
        },
        {
            path: munich,
            name: 'Augsburg Town Square',
            location: 'Munich, Germany (MUC)'
        },
        {
            path: denver,
            name: 'Mountain Highway 70',
            location: 'Denver, Colorado, USA (DEN)'
        }
    ]

    const locationItems = locations.map( 
        location => <li key={location.id}><em>{location.city}:</em> <b>{location.id_code}</b></li>
    )

    const handleDotClick = (index) => setPhotoIndex(index)

    const dots = photos.map((_,index) => 
        <span
            key={index}
            className='dots m-1'
            onClick={()=>handleDotClick(index)}
            style={{fontSize:'smaller'}}
        >{index === photoIndex ? '⚫' : '⚪'}</span>
    )
    
    useEffect(()=>{
        const interval = setInterval(() => {
            setPhotoIndex(prevIndex => (prevIndex + 1) % photos.length);
          }, 5000); // Change photo every 5 seconds
    
        return () => clearInterval(interval);
    },[])

    return( 
        <div id='home' className='container'>
            <div id='about' className='card bg-light m-3'>
                <div className='card-header'><b>About</b></div>
                <div className='card-text' style={{textAlign:'left'}}>
                    Flatiron Airlines is a premiere airline company founded in 2023, by software engineering bootcamp graduates from Flatiron School in NYC. 
                    Currently serving twenty-four airports globally, across North America, Europe, and Asia and featuring craft cocktails and fine dining.
                    With the best hostpiality at 35,000 feet, we're proud to connect you to the world! Book your flight with Flat-lines today!
                </div>
            </div>
            <div className='row'>
                <div id='photos' className='card bg-light col' style={{width:'37rem', height:'18rem'}}>
                    <div className='container' style={{position:'relative'}}>
                        <img className='card-img-top mt-3' src={photos[photoIndex].path} alt='photo'/>
                        <div className='card-text' style={{}}>{dots}</div>
                    </div>
                    <div className='card-body'>
                        <div className='card-header'>{photos[photoIndex].name}</div>
                        <div className='card-text'>{photos[photoIndex].location}</div>
                    </div>
                </div>
                <div id='map' className='col container' style={{position:'relative'}}>
                    <WorldMap style={{height:'25rem',width:'38rem',border:''}}/>
                    <div>
                        <img src={pin} className='pin' style={{top:'115px', left:'120px'}}/>
                        <img src={pin} className='pin' style={{top:'100px', left:'135px'}}/>
                        <img src={pin} className='pin' style={{top:'107px', left:'50px'}}/>
                        <img src={pin} className='pin' style={{top:'85px', left:'55px'}}/>
                        <img src={pin} className='pin' style={{top:'135px', left:'108px'}}/>
                        <img src={pin} className='pin' style={{top:'110px', left:'75px'}}/>
                        <img src={pin} className='pin' style={{top:'110px', left:'252px'}}/>
                        <img src={pin} className='pin' style={{top:'98px', left:'275px'}}/>
                        <img src={pin} className='pin' style={{top:'82px', left:'262px'}}/>
                        <img src={pin} className='pin' style={{top:'145px', left:'480px'}}/>
                        <img src={pin} className='pin' style={{top:'115px', left:'520px'}}/>
                        <img src={pin} className='pin' style={{top:'118px', left:'499px'}}/>
                        
                    </div>
                </div>
                <div id='locations' className='card bg-light col-5 m-1' style={{width:'13rem', maxHeight:'25rem'}}>
                    <div className='card-header'><b>Locations</b></div>
                    <div className='card-body overflow-auto' style={{listStyleType:'none'}}>
                        {locationItems}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Home