import "./BalanceCard.css";

import DotsIcon from "../Components/Icons_Component/DotsIcon";

import BalanceCardEinnahmen from "./BalanceCardEinnahmen";
import BalanceCardAusgaben from "./BalanceCardAusgaben";

import { motion } from "framer-motion"
import { useEffect, useState } from "react";

const BalanceCard = (props) => {
  const [totalBalance, setTotalBalance] = useState(0)
  
  useEffect(() =>{
    const ausgaben =
    props.profileWalletAll && Array.isArray(props.profileWalletAll.transactions)
      ? props.profileWalletAll.transactions
        .filter(t => t.income === false)
        .map(t => t.amount)
        .reduce((sum, amount) => sum + amount, 0)
      : 0

    const einnahmen =
    props.profileWalletAll && Array.isArray(props.profileWalletAll.transactions)
      ? props.profileWalletAll.transactions
        .filter(t => t.income === true)
        .map(t => t.amount)
        .reduce((sum, amount) => sum + amount, 0)
      : 0

    setTotalBalance( einnahmen - ausgaben )
  }, [props.profileWalletAll])
  
  return (
    <motion.section className="card-wrapper"
      initial={{ y: '-5vh' }}
      animate={{ y: 10 }}
      transition={{ delay: .2, type: "spring", stiffness: 200, ease: "easeInOut" }}
      whileHover={{ scale: 1.1 }}
    >
      <article className="card-wrapper-header">
        <div>
          <h5>Totales Guthaben</h5>
          <h2>{props.profileWalletAll ? totalBalance.toFixed(2) : 0} €</h2>
        </div>
        <div>
          <DotsIcon />
        </div>
      </article>
      <article className="in-out">
        <BalanceCardEinnahmen profileWallet={props.profileWalletMonth} />
        <BalanceCardAusgaben profileWallet={props.profileWalletMonth} />
      </article>
    </motion.section>
  );
};

export default BalanceCard;
