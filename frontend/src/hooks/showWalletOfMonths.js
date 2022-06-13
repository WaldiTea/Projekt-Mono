/* eslint-disable react-hooks/rules-of-hooks */
import { useEffect, useState } from "react"
import { apiUrl } from "../api/api"

// custom hook
export const showWalletOfMonths = (token) => {
    const [walletInfo, setWalletInfo] = useState(null)

    useEffect(() => {
        if(!token) {
            return
        }

        fetch(apiUrl + "/api/users/show-wallet-in-period/month", {
            headers: {
                token: "JWT " + token
            }
        })
        .then(response => response.json())
        .then(walletInfoResult => setWalletInfo(walletInfoResult))
    }, [token])
    
    return walletInfo
}