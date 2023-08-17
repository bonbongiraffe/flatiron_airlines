import { useEffect, useState } from "react"
import Autosuggest from "react-autosuggest"

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
    },{
        city: "Hong Kong",
        airport: "HKG"
    },
]
const airportDict = {"Newark":"EWR","Boston":"BOS","Denver":"DEN","Munich":"MUC","Hong Kong":"HKG"}

function ReservationForm({ user }) {
    const [ formData, setFormData ] = useState({origin:"",destination:""})
    // const [ formValid, setFormValid ] = useState(false)

    // console.log(Object.keys(airportDict))

    // const validateForm = () => {
    //     if (Object.keys(airportDict).includes(formData.origin) && Object.keys(airportDict).includes(formData.destination)){
    //         if (formData.origin !== formData.destination){
    //             setFormValid(true)
    //         }
    //     }
    //     setFormValid(false)
    // }

    // useEffect(()=>{
    //     validateForm()
    // },[])

    // const formSchema = yup.object().shape({
    //     origin: yup.string().required(),
    //     destination: yup.string().required()
    // })

    const handleSubmit = (e) => {
        e.preventDefault()
        console.log({...formData, user_id:user.id})
        fetch('/reservations',{
            method: "POST",
            headers: {"Content-Type":"application/json"},
            body: JSON.stringify({...formData, user_id:user.id})
        })
            .then( r => {
                if ( r.ok ){
                    r.json().then(console.log())
                }
            })
    }

    // const cityOptions = Object.keys(airportDict).map( city => <option value={city}></option>)

    return(
        <div>
            <form onSubmit={handleSubmit}>
                <label className="form-titles" htmlFor="origin">Origin:</label>
                    <input 
                        onChange= {(e)=>{setFormData({...formData, origin: e.target.value})}}
                        type="text"
                        name= "origin"
                        placeholder="origin..."
                        className="input-text"
                        value={formData.origin}
                        list="cities"
                    ></input>
                <label className="form-titles" htmlFor="destination">Destination:</label>
                    <input 
                        onChange= {(e)=>{setFormData({...formData, destination: e.target.value})}}
                        type="text"
                        name= "destination"
                        placeholder="destination..."
                        className="input-text"
                        value={formData.destination}
                        list="cities"
                    ></input>
                {/* { formValid? <button onClick={handleSubmit}>Reserve</button> : <h1>Form Incomplete</h1> } */}
                <button type='submit'>Reserve</button>
            </form>
        </div>
    )
}

export default ReservationForm