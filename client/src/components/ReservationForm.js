import { useEffect, useState } from "react"
const airportDict = {"New York":"EWR","Boston":"LGA","Denver":"DEN"}

function ReservationForm() {
    const [ formData, setFormData ] = useState({origin:"",destination:""})
    const [ formValid, setFormValid ] = useState(false)

    console.log(Object.keys(airportDict))

    const validateForm = () => {
        if (Object.keys(airportDict).includes(formData.origin) && Object.keys(airportDict).includes(formData.destination)){
            if (formData.origin !== formData.destination){
                setFormValid(true)
            }
        }
        setFormValid(false)
    }

    useEffect(()=>{
        validateForm()
    },[])
    
    const handleSubmit = (e) => {
        e.preventDefault()
    }

    // const cityOptions = Object.keys(airportDict).map( city => <option value={city}></option>)

    return(
        <div>
            <form>
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
                { formValid? <button onClick={handleSubmit}>Reserve</button> : <h1>Form Incomplete</h1> }
            </form>
        </div>
    )
}

export default ReservationForm