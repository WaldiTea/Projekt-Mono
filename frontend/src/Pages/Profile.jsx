import "./Profile.css";

import { Link, useNavigate } from "react-router-dom";

import Navbar from "../Components/Navbar";
import HeaderLine from "../Components/HeaderLine";

import ProfilIcon from "../Components/Icons_Component/ProfilIcon";
import LetterIcon from "../Components/Icons_Component/LetterIcon";
import SecurityIcon from "../Components/Icons_Component/LoginAndSecurityIcon";
import DataAndPrivacyIcon from "../Components/Icons_Component/DataAndPrivacyIcon";
import LogoutIcon from "../Components/Icons_Component/LogoutIcon";
import { apiUrl } from "../api/api";

const Profile = (props) => {
  const navigate = useNavigate()

  const logout = () => {
        fetch(apiUrl + "/api/users/logout",
          {credentials: "include"}
        )
        
        props.setToken(null)
        navigate("/")
    }
  return (
    <main className="profile">
      <div className="header">
         <HeaderLine title="Profil" />
      </div>
     
      <section>
        <div className="center avatar-img">
          <img src={props.profileWallet.avatar} alt="UserPhoto" />
        </div>
        <h3>{props.profileWallet.name}</h3>
        <h5>{props.profileWallet.email}</h5>
      </section>
      <section className="list-profil">
        <ul>
          <li>
            <Link to="#">
              <div className="icon-wrapper">
                <ProfilIcon />
              </div>
              Account
            </Link>
          </li>

          <li>
            <Link to="#">
              <div className="icon-wrapper">
                <LetterIcon />
              </div>
              Nachrichten
            </Link>
          </li>

        

          <li>
            <Link to="#">
              <div className="icon-wrapper">
                <SecurityIcon />
              </div>
              Einstellungen
            </Link>
          </li>
          <li>
            <Link to="#">
              <div className="icon-wrapper">
                <DataAndPrivacyIcon />
              </div>
              Datenschutz
            </Link>
          </li>
          <li onClick={logout}>
              <div className="icon-wrapper">
                <LogoutIcon />
              </div>
              Logout
          </li>
        </ul>
      </section>
      <Navbar />
    </main>
  );
};

export default Profile;
