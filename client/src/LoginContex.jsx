import axios from "axios";
import { createContext, useEffect, useState } from "react";

export const LoginContext = createContext({})

export function LoginContextProvider({children}) {
    const [user,setUser] = useState(null)
    const [ready,setReady] = useState(false)

    useEffect(()=>{
        if(!user){
            axios.get('/profile').then(({data}) =>{
                setUser(data)
                setReady(true)
            })
        }
    }, [])

    return(
        <LoginContext.Provider value={{user,setUser,ready}}>{children}</LoginContext.Provider>
    )
}