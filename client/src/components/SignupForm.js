import { useState } from "react"
import { useFormik } from "formik"
import * as yup from "yup"

function SignupForm({ setUser, navigate }) {
    //const [ formData, setFormData ] = useState({email:"",first_name:"",last_name:"",password:""})

    const handleSignup = (values) => {
        fetch('signup',{
            method: "POST",
            headers: {"Content-Type":"application/json"},
            body: JSON.stringify(values, null, 2)
        })
            .then( r => {
                if ( r.ok ) {
                    r.json().then( newUser => setUser(newUser))
                    setFormData({email:"",first_name:"",last_name:"",password:""})
                    navigate('/')
                }
            })
    }

    const formSchema = yup.object().shape({
        email: yup.string().email("Invalid email").required("Must enter email"),
        first_name: yup.string().min(1,'Name cannot be empty').max(15,'Name cannot exceed 15 characters').required("Must enter first name"),
        last_name: yup.string().min(1,'Name cannot be empty').max(15,'Name cannot exceed 15 characters').required("Must enter last name"),
        password: yup.string().min(5,'Password must be at least 5 characters long').required('Must enter a password')
    })

    const formik = useFormik({
        initialValues:{
            email:"",
            first_name:"",
            last_name:"",
            password:""
        },
        validationSchema: formSchema,
        onSubmit: handleSignup
    })

    return(
        <div className="auth-form">
            <form onSubmit={formik.handleSubmit}>
                <label className="form-titles" htmlFor="email">Email:</label>
                    <input 
                        onChange= {formik.handleChange}
                        type="text"
                        name= "email"
                        placeholder="email..."
                        className="input-text"
                        value={formik.values.email}
                    ></input>
                <label className="form-titles" htmlFor="first-name">First Name:</label>
                    <input 
                        onChange= {formik.handleChange}
                        type="text"
                        name= "first name"
                        placeholder="first name..."
                        className="input-text"
                        value={formik.values.first_name}
                    ></input>
                <label className="form-titles" htmlFor="last-name">Last Name:</label>
                    <input 
                        onChange= {formik.handleChange}
                        type="text"
                        name= "last name"
                        placeholder="last name..."
                        className="input-text"
                        value={formik.values.last_name}
                    ></input>
                <label className="form-titles" htmlFor="password">Password:</label>
                    <input 
                        onChange= {formik.handleChange}
                        type="password"
                        name= "password"
                        placeholder="password..."
                        className="input-password"
                        value={formik.values.password}
                    ></input>
                <button type='submit'>Signup</button>
            </form>
        </div>
    )
}

export default SignupForm