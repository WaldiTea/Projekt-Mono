/* eslint-disable react-hooks/rules-of-hooks */
import { useEffect, useState } from "react"
import { apiUrl } from "../api/api"

// custom hook
export const showWallet = (token) => {
    const [walletInfo, setWalletInfo] = useState(null)

    useEffect(() => {
        if(!token) {
            return
        }

        fetch(apiUrl + "/api/users/show-wallet/", {
            headers: {
                token: "JWT " + token
            }
        })
        .then(response => response.json())
        .then(walletInfoResult => setWalletInfo(walletInfoResult))
    }, [token])
    
    return walletInfo
}