import '../styling/App.css';
import { React } from "react"
import { Route, Routes, useNavigate } from "react-router-dom"
import CreateResForm from './CreateResForm'
import EditResForm from './EditResForm'
import NavBar from "./NavBar"
import SignupForm from "./SignupForm"
import LoginForm from "./LoginForm"
import MyFlights from "./MyFlights"
import { UserProvider  } from '../context/user'
import { LocationsProvider } from '../context/locations'

function App() {
  const navigate = useNavigate()

  return (
    <div className="App">
      <UserProvider>
        <LocationsProvider> 
        <NavBar navigate={navigate}/>
        <Routes>
          <Route path='my-flights' element={<MyFlights/>}></Route>
          <Route path='new-reservation' element={<CreateResForm/>}></Route>
          <Route path='manage-reservations' element={<EditResForm/>}></Route>
          <Route path='signup' element={<SignupForm navigate={navigate}/>}></Route>
          <Route path='login' element={<LoginForm navigate={navigate}/>}></Route>
        </Routes>
        </LocationsProvider>
      </UserProvider>
    </div>
  );
}

export default App;
