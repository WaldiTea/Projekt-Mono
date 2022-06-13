import "./Navbar.css";
import { NavLink,Link } from "react-router-dom";

import HomeIcon from "./Icons_Component/HomeIcon";
import StatistikIcon from "./Icons_Component/StatistikIcon";
import PlusIcon from "./Icons_Component/PlusIcon";
import MinusIcon from "./Icons_Component/MinusIcon";
import WalletIcon from "./Icons_Component/WalletIcon";
import ProfilIcon from "./Icons_Component/ProfilIcon";

import { useState } from "react";

const Navbar = () => {
  const [state, setState] = useState(true);

  const Toggle = () => {
    setState(!state);
  };

  return (
    <nav className="navigation">
      <ul>
        <li>
          <NavLink to="/home" activeclassname="active">
            <HomeIcon />
          </NavLink>
        </li>

        <li>
          <NavLink to="/statistik" activeclassname="active">
            <StatistikIcon />
          </NavLink>
        </li>

        <li>
          <NavLink to="#" activeclassname="active">
            <div>
              <div className={"plus-minus-wrapper " + (state ? "hidden" : "")}>
                <Link to="/einnahme">
                  <div className="plus-btn center">
                    {" "}
                    <PlusIcon />
                  </div>
                </Link>

                <Link to="/ausgabe">
                <div className="minus-btn center">
                  {" "}
                  <MinusIcon />
                </div>
                </Link>
                
              </div>

              <div onClick={Toggle} className="plus-wrapper-icon center">
                <PlusIcon />
              </div>
            </div>
          </NavLink>
        </li>

        <li>
          <NavLink to="/wallet" activeclassname="active">
            <WalletIcon />
          </NavLink>
        </li>

        <li>
          <NavLink to="/profil" activeclassname="active">
            <ProfilIcon />
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
