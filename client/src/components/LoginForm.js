import { useState } from "react"

function SignupForm({ setUser }) {
    const [ formData, setFormData ] = useState({email:"",password:""})

    const handleSignup = (e) => {
        e.preventDefault()
        fetch('login',{
            method: "POST",
            headers: {"Content-Type":"application/json"},
            body: JSON.stringify(formData)
        })
            .then( r => r.json())
            .then( newUser => setUser(newUser))
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
                <button onClick={handleSignup}>Signup</button>
            </form>
        </div>
    )
}

export default SignupForm