import { NavLink } from "react-router-dom";

function NavBar({ user, setUser, navigate }) {

    const handleLogout = () => {
        fetch("/logout",{
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
        <div className="header">
            <div className="left-side-nav">
                {/* <img className="my-trails" src={mytrails} alt='My Trails' height={75}/> */}
            </div>
            <div className="center-nav">
                {user ? <p className="hello">Welcome, {user.first_name}</p> : null}
            </div>
            <div className="nav-bar">
                {user ? 
                <> 
                    <li className="nav-bar-list"><NavLink className="nav-bar-link" to="home">Home</NavLink></li>
                    <li className="nav-bar-list"><NavLink className="nav-bar-link" to="reservation">Reservation</NavLink></li>
                    <li className="nav-bar-list"><button className="nav-bar-link" onClick={handleLogout}>Logout</button></li>
                </>
                :
                <>
                    <li className="nav-bar-list"><button className="nav-bar-link" onClick={()=> navigate('signup')}>Signup</button></li>
                    <li className="nav-bar-list"><button className="nav-bar-link" onClick={()=> navigate('login')}>Login</button></li>
                </>
                }               
            </div>
        </div>
    )
}

export default NavBar