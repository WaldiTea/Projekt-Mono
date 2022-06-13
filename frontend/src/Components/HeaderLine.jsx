import "./HeaderLine.css";

import BackButton from "./BackButton";
import DotsIcon from "./Icons_Component/DotsIcon";

import { Link } from "react-router-dom";

const HeaderLine = (props) => {
  return (
    <header className="header-line">
      <Link to="/home">
        <BackButton />
      </Link>

      <h4>{props.title}</h4>
      <DotsIcon />
    </header>
  );
};

export default HeaderLine;
