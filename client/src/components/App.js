import '../styling/App.css';
import { React, useState, useEffect } from "react"
import { Route, Routes, useNavigate } from "react-router-dom";
import NavBar from "./NavBar"
import SignupForm from "./SignupForm"
import LoginForm from "./LoginForm"
import ReservationForm from "./ReservationForm"

function App() {
  const [ user, setUser ] = useState(null)
  const navigate = useNavigate()

  const fetchUser = () => {
    fetch("/authorized")
      .then( r => {
        if (r.ok) {
          r.json().then( user => setUser(user) )
        }
      })
  }

  useEffect(()=>{
    fetchUser()
  },[])

  return (
    <div className="App">
      <NavBar user={user} setUser={setUser} navigate={navigate}/>
      <Routes>
        <Route path='reservation' element={<ReservationForm user={user}/>}></Route>
        <Route path='signup' element={<SignupForm setUser={setUser} navigate={navigate}/>}></Route>
        <Route path='login' element={<LoginForm setUser={setUser} navigate={navigate}/>}></Route>
      </Routes>
    </div>
  );
}

export default App;
