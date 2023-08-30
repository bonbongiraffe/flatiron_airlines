import { NavLink } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from '../context/user'

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
        <nav className="navbar navbar-light justify-content-center navbar-expand-lg bg-light border-bottom">
            <a class="navbar-brand" href="home">
                {/* <img className="d-inline align-top"src="static/flatlines192.png" width="45" height="45" alt=""/> */}
                Unity Airlines
            </a>
            <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNav">
                <ul className="navbar-nav">
                    {user ? 
                    <> 
                        <li className="nav-item"><NavLink className="nav-link" to="my-flights">My Flights</NavLink></li>
                        <li className="nav-item"><NavLink className="nav-link" to="new-reservation">New Reservation</NavLink></li>
                        <li className="nav-item"><NavLink className="nav-link" to="manage-reservations">Manage Reservations</NavLink></li>
                    </>
                    :
                    <>
                        <li className="nav-item"><button className="nav-link btn btn-outline-primary" onClick={()=> navigate('signup')}>Signup</button></li>
                        <li className="nav-item"><button className="nav-link btn btn-outline-success" onClick={()=> navigate('login')}>Login</button></li>
                    </>
                    }               
                </ul>
            </div>
            <div className="navbar-text">
                { user ? <p className="hello">Welcome, {user.first_name}</p> : null}
            </div>
            { user ? <button className="btn btn-outline-secondary" onClick={handleLogout}>Logout</button> : null}
        </nav>
    )
}

export default NavBar