import { useFormik } from "formik"
import * as yup from "yup"
import { UserContext } from '../context/user'
import { useContext } from "react"

function SignupForm({ navigate }) {
    const { setUser } = useContext(UserContext)
    const handleSignup = (values) => {
        fetch('signup',{
            method: "POST",
            headers: {"Content-Type":"application/json"},
            body: JSON.stringify(values, null, 2)
        })
            .then( r => {
                if ( r.ok ) {
                    r.json().then( newUser => setUser(newUser))
                    navigate('/')
                }
            })
    }

    const formSchema = yup.object().shape({
        email: yup.string().email("Invalid email").required("Must enter email"),
        firstName: yup.string().min(1,'Name cannot be empty').max(15,'Name cannot exceed 15 characters').required("Must enter first name"),
        lastName: yup.string().min(1,'Name cannot be empty').max(15,'Name cannot exceed 15 characters').required("Must enter last name"),
        password: yup.string().min(5,'Password must be at least 5 characters long').required('Must enter a password')
    })

    const formik = useFormik({
        initialValues:{
            email:"",
            firstName:"",
            lastName:"",
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
                    />
                    <p>{formik.errors.email}</p>
                <label className="form-titles" htmlFor="first-name">First Name:</label>
                    <input 
                        onChange= {formik.handleChange}
                        type="text"
                        name="firstName"
                        placeholder="first name..."
                        className="input-text"
                        value={formik.values.firstName}
                    />
                    <p>{formik.errors.firstName}</p>
                <label className="form-titles" htmlFor="last-name">Last Name:</label>
                    <input 
                        onChange= {formik.handleChange}
                        type="text"
                        name="lastName"
                        placeholder="last name..."
                        className="input-text"
                        value={formik.values.lastName}
                    />
                    <p>{formik.errors.lastName}</p>
                <label className="form-titles" htmlFor="password">Password:</label>
                    <input 
                        onChange= {formik.handleChange}
                        type="password"
                        name= "password"
                        placeholder="password..."
                        className="input-password"
                        value={formik.values.password}
                    />
                    <p>{formik.errors.password}</p>
                <button type='submit'>Signup</button>
            </form>
        </div>
    )
}

export default SignupForm