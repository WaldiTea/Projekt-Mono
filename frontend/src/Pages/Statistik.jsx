import Navbar from "../Components/Navbar";
import HeaderLine from "../Components/HeaderLine";

import "./Statistik.css";
import TopAusgaben from "../Components/TopAusgaben";
import StatistikSection from "../Components/StatistikSection";
import { useState } from "react";

const Statistik = (props) => {
  const[transactionData, setTransactionData] = useState([])
  return (
    
    <main className="statistik">
      <HeaderLine title="Statistik" />
      <StatistikSection transactionData={transactionData} setTransactionData={setTransactionData} token={props.token}/>
      <TopAusgaben transactionData={transactionData}/>
      <Navbar />
    </main>
  );
};

export default Statistik;
