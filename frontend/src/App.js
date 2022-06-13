import "./App.css";
import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";

import StartPage from "./Pages/StartPage";
import LoginPage from "./Pages/LoginPage";
import SingUp from "./Pages/SingUp";
import Home from "./Pages/Home";
import Profil from "./Pages/Profile";
import Wallet from "./Pages/Wallet";
import Statistik from "./Pages/Statistik";
import AddExpense from "./Pages/AddExpense";
import AddIncome from "./Pages/AddIncome";
import TransactionDetails from "./Pages/TransactionDetails";
import { useState } from "react";
import AuthRequired from "./Components/AuthRequired";
import { showWallet } from "./hooks/showWallet";
import EditExpense from "./Pages/EditExpense";
import EditIncome from "./Pages/EditIncome";

function App() {
  const [token, setToken] = useState(null)
  const navigate = useNavigate()

  const loginSuccess = (token) => {
    setToken(token)
    navigate("/home")
  }

  const profileWallet = showWallet(token)
  
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<StartPage />} />
        <Route path="/login" element={<LoginPage loginSuccess={loginSuccess} />} />
        <Route path="/registrieren" element={<SingUp />} />
        <Route path="/home"
          element={
            <AuthRequired token={token} setToken={setToken}>
              <Home profileWallet={profileWallet} token={token} />
            </AuthRequired>
          }
        />
        <Route path="/profil"
          element={
            <AuthRequired token={token} setToken={setToken}>
              <Profil setToken={setToken} profileWallet={profileWallet} />
            </AuthRequired>
          }
        />
        <Route path="/wallet"
          element={
            <AuthRequired token={token} setToken={setToken}>
              <Wallet profileWallet={profileWallet} />
            </AuthRequired>
          }
        />
        <Route path="/statistik"
          element={
            <AuthRequired token={token} setToken={setToken}>
              <Statistik token={token} />
            </AuthRequired>
          }
        />

        <Route path="/transactions-details/:transactionId"
          element={
            <AuthRequired token={token} setToken={setToken}>
              <TransactionDetails token={token} />
            </AuthRequired>
          }
        />

        <Route path="/ausgabe"
          element={
            <AuthRequired token={token} setToken={setToken}>
              <AddExpense token={token} />
            </AuthRequired>
          }
        />
        <Route path="/einnahme"
          element={
            <AuthRequired token={token} setToken={setToken}>
              <AddIncome token={token} />
            </AuthRequired>
          }
        />

        <Route path="/editExp/:transactionId"
          element={
            <AuthRequired token={token} setToken={setToken}>
              <EditExpense token={token} />
            </AuthRequired>
          }
        />
        <Route path="/editIncome/:transactionId"
          element={
            <AuthRequired token={token} setToken={setToken}>
              <EditIncome token={token} />
            </AuthRequired>
          }
        />
      </Routes>
    </div>
  );
}

export default function AppRouter() {
  return (
    <BrowserRouter>
      <App />
    </BrowserRouter>
  )
}
