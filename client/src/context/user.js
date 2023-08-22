import React, { useState, useEffect } from "react"

const UserContext = React.createContext()
const defaultUser = {reservations:[{id:0,flight_id:1}]}

function UserProvider({ children }){
    const [ user, setUser ] = useState(null) 
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
        <UserContext.Provider value={{ user, setUser }}>
           {children}
        </UserContext.Provider>
    )
}

export { UserContext, UserProvider }