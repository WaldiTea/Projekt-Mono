import { useEffect, useState } from "react"
import { Navigate } from "react-router-dom"
import { apiUrl } from "../api/api"
import Loading from "./Loading"

const AuthRequired = (props) => {
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        if(props.token) {
            setLoading(false)
            return
        }
        
        fetch(apiUrl + "/api/users/refreshtoken", {
            method: "POST",
            mode: 'cors',
            headers: {
                "Content-Type": "application/json"
            },
            credentials: "include"
        })
        .then(response => response.json())
        .then((data) => {
            setLoading(false)
            if(data.token) {
                props.setToken(data.token)
            }
        })
    }, [props])

    if(loading) {
        return <Loading />
    } 
    
    if(!props.token) {
        return <Navigate to="/" />
    }

    
    return <>{props.children}</>
}

export default AuthRequired;