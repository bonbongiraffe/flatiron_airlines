import { NavLink } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from '../context/user'
import logo from '../assets/flatlines-512.png'

function NavBar({ navigate }) {
    const { user, setUser } = useContext(UserContext)

    const handleLogout = () => {
        fetch("logout",{
          method: "DELETE"
        })
          .then( r => {
            if (r.ok) {
              setUser(null)
              navigate('/')
            }
          })
        }

    return(
        <nav className="navbar navbar-light justify-content-center navbar-expand-lg bg-dark border-bottom mb-3">
            <a class="navbar-brand" href="/">
                <img className="d-inline-block align-top mx-3" src={logo} width="45" height="45" alt="flatiron airlines logo"/>
                <span className='' style={{color:'white'}}>Flatiron Airlines</span>
            </a>
            <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNav" style={{color:'white'}}>
                <ul className="navbar-nav">
                    {user ? 
                    <> 
                        <li className="nav-item"><NavLink style={{color:'white'}} className="nav-link" to="home">Home</NavLink></li>
                        <li className="nav-item"><NavLink style={{color:'white'}} className="nav-link" to="my-flights">My Flights</NavLink></li>
                        <li className="nav-item"><NavLink style={{color:'white'}} className="nav-link" to="new-reservation">New Reservation</NavLink></li>
                        <li className="nav-item"><NavLink style={{color:'white'}} className="nav-link" to="manage-reservations">Manage Reservations</NavLink></li>
                    </>
                    :
                    <>
                        <li className="nav-item"><NavLink style={{color:'white'}} className="nav-link" to="home">Home</NavLink></li>
                        <li className="nav-item"><button style={{color:'white'}} className="nav-link btn btn-outline-primary mx-1" onClick={()=> navigate('signup')}>Signup</button></li>
                        <li className="nav-item"><button style={{color:'white'}} className="nav-link btn btn-outline-success mx-1" onClick={()=> navigate('login')}>Login</button></li>
                    </>
                    }               
                </ul>
            </div>
            <div className="navbar-text">
                { user ? <p className="hello mx-2" style={{color:'white'}}>Welcome, {user.first_name}</p> : null}
            </div>
            { user ? <button className="btn btn-outline-secondary mx-3" onClick={handleLogout}>Logout</button> : null}
        </nav>
    )
}

export default NavBar