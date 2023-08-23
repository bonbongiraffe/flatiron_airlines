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
        <nav className="navbar justify-content-center navbar-expand-lg bg-light">
            <div className="a">
                {/* <img className="my-trails" src={mytrails} alt='My Trails' height={75}/> */}
            </div>
            <div className="navbar-brand">
                <p>Unity Airlines</p>
            </div>
            <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNav">
                <ul className="navbar-nav">
                    {user ? 
                    <> 
                        <li className="nav-item"><NavLink className="nav-link" to="home">Home</NavLink></li>
                        <li className="nav-item"><NavLink className="nav-link" to="new-reservation">New Reservation</NavLink></li>
                        <li className="nav-item"><NavLink className="nav-link" to="manage-reservations">Manage Reservations</NavLink></li>
                    </>
                    :
                    <>
                        <li className="nav-item"><button className="nav-link" onClick={()=> navigate('signup')}>Signup</button></li>
                        <li className="nav-item"><button className="nav-link" onClick={()=> navigate('login')}>Login</button></li>
                    </>
                    }               
                </ul>
            </div>
            <div className="navbar-text">
                {user ? <p className="hello">Welcome, {user.first_name}</p> : null}
            </div>
            <button className="btn" onClick={handleLogout}>Logout</button>
        </nav>
    )
}

export default NavBar