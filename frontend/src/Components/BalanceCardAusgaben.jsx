import ArrowUpIcon from "../Components/Icons_Component/ArrowUpIcon";

const BalanceCardAusgaben = (props) => {
  
  const ausgaben = 
    props.profileWallet && Array.isArray(props.profileWallet.transactions) 
    ? props.profileWallet.transactions
      .filter(t => t.income === false)
      .map(t => t.amount)
      .reduce((sum, amount) => sum + amount, 0)
    : 0 

  return (
    <div>
      <p>
        <span>
          <ArrowUpIcon />
        </span>
        Ausgaben {new Date(props.profileWallet?.transactions[0]?.created_at).toLocaleString("de-DE", { month: "long" })}
      </p>
      <h4 className="ausgaben">{ausgaben.toFixed(2)} €</h4>
    </div>
  );
};

export default BalanceCardAusgaben;
