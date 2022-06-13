import "./TopAusgaben.css";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";


const TopAusgaben = (props) => {
  return (
    <section className="ausgaben-list">
      <article>
      </article>
      <article>
        {props.transactionData?.filterAllTransaction?.map((t,i) =>
        <motion.div
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
            <div className="list-item">
              <div className="list-icon-name">
                <div className="icon-list center">
                  <h3>{t.name.charAt(0)}</h3>
                </div>
                <div>
                  <h5>{t.name}</h5>
                  <p>{new Date(t.created_at).toLocaleDateString('de-DE', { year: 'numeric', month: '2-digit', day: '2-digit' })}</p>
                </div>
              </div>
              <div className="betrag">
                <h4 className={!t.income ? "red" : "green"}>{(!t.income ? "- " : "+ ") + t.amount.toFixed(2)} €</h4>
              </div>
            </div>
          </Link>
          </motion.div>
        )}
      </article>
    </section>
  );
};

export default TopAusgaben;
