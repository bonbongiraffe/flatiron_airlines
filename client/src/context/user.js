import React, { useState, useEffect } from "react"

const UserContext = React.createContext()

function UserProvider({ children }){
    const [ user, setUser ] = useState({reservations:[{id:0,flight_id:1}]}) 
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