import { useFormik } from "formik"
import * as yup from "yup"

function SignupForm({ setUser, navigate }) {
    const formSchema = yup.object().shape({
        email: yup.string().email("Invalid email").required("Must enter email"),
        password: yup.string().min(5,'Password must be at least 5 characters long').required('Must enter a password')
    })

    const handleLogin = (values) => {
        fetch('login',{
            method: "POST",
            headers: {"Content-Type":"application/json"},
            body: JSON.stringify(values,null,2)
        })
            .then( r => {
                if ( r.ok ) {
                    r.json().then( newUser => setUser(newUser))
                    navigate('/')
                }
            })
    }

    const formik = useFormik({
        initialValues:{
            email:"",
            password:""
        },
        validationSchema: formSchema,
        onSubmit: handleLogin
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
                <button type='submit'>Login</button>
            </form>
        </div>
    )
}

export default SignupForm