import "./TransactionDetails.css";
import HeaderLine from "../Components/HeaderLine";
import Navbar from "../Components/Navbar";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { apiUrl } from "../api/api";
import Loading from "../Components/Loading";
import { Link } from "react-router-dom";

const TransactionDetails = (props) => {
  const { transactionId } = useParams()
  const [transaction, setPost] = useState()

  useEffect(() => {
    fetch(apiUrl + "/api/transactions/" + transactionId, {
      headers: {
        token: "JWT " + props.token
      }
    })
      .then(response => response.json())
      .then(transactionResult => {
        setPost(transactionResult.foundTransaction)
      })
  }, [props.token, transactionId])

  return (
    <main className="trans-detail-wrapper-expense">
      <section className="header-section">
        <HeaderLine title="Transaction Details" />
      </section>
      {transaction
        ?
        <div className="wrapper-inner">
          <section className="top">
            <div className="center">
              <h2>{transaction.name.charAt(0)}</h2>
            </div >
            <p className={transaction.income ? "green-income mb-5" : "red-expense mb-5"}> {transaction.income ? "Einnahme" : "Ausgabe"}</p>
            <h3>{transaction.amount.toFixed(2)} €</h3>
          </section>

          <section>
            <h4>Transaction Details</h4>
            <article>
              <ul>
                <li>
                  <p>Status</p> <h5 className={transaction.income ? "green" : "red"}> {transaction.income ? "Einnahme" : "Ausgabe"}</h5>
                </li>
                <li>
                  <p>Name</p> <h5>{transaction.name}</h5>
                </li>
                <li>
                  <p>Zeit</p> <h5>{new Date(transaction.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</h5>
                </li>
                <li>
                  <p>Datum</p> <h5>{new Date(transaction.created_at).toLocaleDateString('de-DE', { year: 'numeric', month: '2-digit', day: '2-digit' })}</h5>
                </li>
                <hr />
                <li>
                  <p>Beitrag</p> <h5>{transaction.amount.toFixed(2)} €</h5>
                </li>
                <hr />
                <li>
                  <p>Total</p> <h5>{transaction.amount.toFixed(2)} €</h5>
                </li>
              </ul>
            </article>
            <p className="photo-label">Foto</p>
            <img src={transaction.image} alt={transaction.name} />
          </section>
          <button>
            <Link to={transaction.income ? "/editIncome/" + transaction._id: "/editExp/" + transaction._id}>
              Bearbeiten</Link></button>
        </div>
        :
        <Loading />
      }
      <Navbar />
    </main>
  )
}

export default TransactionDetails;
