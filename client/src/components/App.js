import '../styling/App.css';
import { React } from "react"
import { Route, Routes, useNavigate } from "react-router-dom";
import NavBar from "./NavBar"
import SignupForm from "./SignupForm"
import LoginForm from "./LoginForm"
import ReservationForm from "./ReservationForm"
import Home from "./Home"
import { UserProvider  } from '../context/user';
import { LocationsProvider } from '../context/locations';
import ReservationManager from './ReservationManager';


function App() {
  // const [ user, setUser ] = useState(null)
  const navigate = useNavigate()
  // console.log("from App.js",user)

  return (
    <div className="App">
      <UserProvider>
        <LocationsProvider> 
        <NavBar navigate={navigate}/>
        <Routes>
          <Route path='home' element={<Home/>}></Route>
          <Route path='new-reservation' element={<ReservationForm/>}></Route>
          <Route path='manage-reservations' element={<ReservationManager/>}></Route>
          <Route path='signup' element={<SignupForm navigate={navigate}/>}></Route>
          <Route path='login' element={<LoginForm navigate={navigate}/>}></Route>
        </Routes>
        </LocationsProvider>
      </UserProvider>
    </div>
  );
}

export default App;
