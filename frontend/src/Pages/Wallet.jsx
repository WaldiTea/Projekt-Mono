import "./Wallet.css";
import { Link } from "react-router-dom";
import Navbar from "../Components/Navbar";
import TransactionHistoryList from "../Components/TransactionHistoryList";
import PlusIcon from "../Components/Icons_Component/PlusIcon";
import PaypalIcon from "../Components/Icons_Component/PaypalIcon";
import MinusIcon from "../Components/Icons_Component/MinusIcon";
import HeaderLine from "../Components/HeaderLine";

const Wallet = (props) => {
  const ausgaben = 
    props.profileWallet && Array.isArray(props.profileWallet.transactions) 
    ? props.profileWallet.transactions
      .filter(t => t.income === false)
      .map(t => t.amount)
      .reduce((sum, amount) => sum + amount, 0)
    : 0 

    const einnahmen = 
    props.profileWallet && Array.isArray(props.profileWallet.transactions) 
    ? props.profileWallet.transactions
      .filter(t => t.income === true)
      .map(t => t.amount)
      .reduce((sum, amount) => sum + amount, 0)
    : 0 

    const totalBalance = einnahmen - ausgaben

  return (
    <main className="wallet">
      <section className="header-section">
        <HeaderLine title="Wallet" />
      </section>
      <div className="wrapper-inner">
        <section className="total-balance">
          <p>Totaler Beitrag</p>
          <h3>
            {props.profileWallet
              ? totalBalance.toFixed(2)
              : 0}{" "}
            €
          </h3>
          <article>
            <Link to="/einnahme">
              <div className="icon-wr">
                <div className="icon-wrapper center">
                  <PlusIcon />
                </div>
                <p>Einnahme</p>
              </div>
            </Link>
            <Link to="/ausgabe">
              <div className="icon-wr">
                <div className="icon-wrapper center">
                  <MinusIcon />
                </div>
                <p>Ausgabe</p>
              </div>
            </Link>
            <a href="https://www.paypal.com/de/home" target="_blank" rel="noreferrer">
              <div className="icon-wr">
                <div className="icon-wrapper center pa">
                  <PaypalIcon />
                </div>
                <p>Geld senden</p>
              </div>
            </a>
          </article>
        </section>
        <section>
          <TransactionHistoryList profileWallet={props.profileWallet} />
        </section>
      </div>

      <Navbar />
    </main>
  );
};

export default Wallet;
<main></main>;
