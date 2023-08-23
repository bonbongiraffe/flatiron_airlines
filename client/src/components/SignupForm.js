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
        <div className="form">
            <form onSubmit={formik.handleSubmit}>
                <div className="row">
                    <div className="col">
                        <input 
                            onChange= {formik.handleChange}
                            type="text"
                            name="firstName"
                            placeholder="first name..."
                            className="form-control"
                            value={formik.values.firstName}
                        /><p>{formik.errors.firstName}</p>
                    </div>
                    <div className="col">
                        <input 
                            onChange= {formik.handleChange}
                            type="text"
                            name="lastName"
                            placeholder="last name..."
                            className="form-control"
                            value={formik.values.lastName}
                        /><p>{formik.errors.lastName}</p>
                    </div>
                </div>
                <div className="row">
                    <div className="col">
                        <input 
                            onChange= {formik.handleChange}
                            type="text"
                            name= "email"
                            placeholder="email..."
                            className="form-control"
                            value={formik.values.email}
                        /><p>{formik.errors.email}</p>
                    </div>
                    <div className="col">
                        <input 
                            onChange= {formik.handleChange}
                            type="password"
                            name= "password"
                            placeholder="password..."
                            className="form-control"
                            value={formik.values.password}
                        /><p>{formik.errors.password}</p>
                    </div>
                </div>
                <button type='submit'>Signup</button>
            </form>
        </div>
    )
}

export default SignupForm