import { useState } from "react"
import { useFormik } from "formik"
import * as yup from "yup"

function SignupForm({ setUser, navigate }) {
    const [ formData, setFormData ] = useState({email:"",password:""})
    const [ error, setError ] = useState([])

    const handleSignup = (e) => {
        e.preventDefault()
        fetch('login',{
            method: "POST",
            headers: {"Content-Type":"application/json"},
            body: JSON.stringify(formData)
        })
            .then( r => {
                if ( r.ok ) {
                    r.json().then( newUser => setUser(newUser))
                    setFormData({email:"",password:""})
                    navigate('/')
                }
            })
    }

    return(
        <div className="auth-form">
            <form>
                <label className="form-titles" htmlFor="email">Email:</label>
                    <input 
                        onChange= {(e)=>{setFormData({...formData, email: e.target.value})}}
                        type="text"
                        name= "email"
                        placeholder="email..."
                        className="input-text"
                        value={formData.email}
                    ></input>
                <label className="form-titles" htmlFor="password">Password:</label>
                    <input 
                        onChange= {(e)=>{setFormData({...formData, password: e.target.value})}}
                        type="password"
                        name= "password"
                        placeholder="password..."
                        className="input-password"
                        value={formData.password}
                    ></input>
                <button onClick={handleSignup}>Login</button>
                { error ? <h1>{error}</h1> : null }
            </form>
        </div>
    )
}

export default SignupForm