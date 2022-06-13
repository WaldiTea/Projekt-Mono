import "./TransactionHistoryList.css";

import { Link } from "react-router-dom";
import Loading from "./Loading";

import { motion } from "framer-motion"

const TransactionHistoryList = (props) => {

  return (
    <section className="trans-list">
      <article className="list-header">
        <h4>Transaktionshistorie <span> in {new Date(props.profileWallet?.transactions[0]?.created_at).toLocaleString("de-DE", { month: "long" })}</span></h4>
        <Link className="see-all-list" to="/wallet">Alle anzeigen</Link>
      </article>
      {props.profileWallet && Array.isArray(props.profileWallet.transactions)
        ?
        props.profileWallet.transactions.map((t, i) =>
          <motion.article key={t._id} className="list-body"
            initial={{y: '100vh'}}
            animate={
              {
                opacity: [0, 0.5, 1],
                y: [100, 0, 0]
              }
            }
            transition={{type: 'twin',duration:.5, delay: ((parseInt(i) + .5) / 10)}}
          >
            <Link to={"/transactions-details/" + t._id}>
              <motion.div className="list-item">
                <div className="list-icon-name">
                  <div className="icon-list center">
                    <h3 >{t.name.charAt(0)}</h3>
                  </div>
                  <div>
                    <h5>{t.name}</h5>
                    <p>{new Date(t.created_at).toLocaleDateString('de-DE', { year: 'numeric', month: '2-digit', day: '2-digit' })}</p>
                  </div>
                </div>
                <div className="betrag">
                  <h4 className={!t.income ? "red" : "green"}>{!t.income ? "- " + t.amount.toFixed(2) : "+ " + t.amount.toFixed(2)} €</h4>
                </div>
              </motion.div>
            </Link>
          </motion.article>
        )
        :
        <Loading />
      }


    </section>
  );
};

export default TransactionHistoryList;
