import "./HeaderLine.css";
import BackButton from "./BackButton";
import { Link } from "react-router-dom";
import TrashIcon from "./Icons_Component/TrashIcon";
import { useNavigate } from "react-router-dom";
import { apiUrl } from "../api/api";

const HeaderLine = (props) => {
  const navigate = useNavigate()

  const deleteTransaction = () => {
    fetch(apiUrl + "/api/transactions/delete/" + props.transactionId, {
      method: "DELETE",
      headers: {
          token: "JWT " + props.token
      },
  })
      .then((response) => response.json())
      .then((result) => {
          if (result.acknowledged) {
              navigate("/home")
          }
      })
  }
  return (
    <header className="header-line">
      <Link to="/home">
        <BackButton />
      </Link>

      <h4>{props.title}</h4>
      <div className="shake-trash-icon" onClick={deleteTransaction}>
        <TrashIcon />
      </div>
    </header>
  );
};

export default HeaderLine;
 