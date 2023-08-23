import { useFormik } from "formik"
import { UserContext } from '../context/user'
import { useContext, useEffect } from "react"
import * as yup from "yup"

function LoginForm({ navigate }) {
    const { setUser } = useContext(UserContext)

    useEffect(()=>{document.title='Flatlines | Login'},[])

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
        <div className="form">
            <form onSubmit={formik.handleSubmit}>
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
                <button type='submit'>Login</button>
            </form>
        </div>
    )
}

export default LoginForm