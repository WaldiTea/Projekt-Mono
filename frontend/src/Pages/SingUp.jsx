import "./SingUp.css";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { apiUrl } from "../api/api";
import PlusIcon from "../Components/Icons_Component/PlusIcon";
import { motion } from "framer-motion"

const SingUp = () => {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [avatar, setAvatar] = useState()
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")

  const navigate = useNavigate()

  const register = (event) => {
    event.preventDefault()
    const formData = new FormData()
    formData.set("name", name)
    formData.set("email", email)
    formData.set("password", password)
    formData.set("avatar", avatar)
    fetch(apiUrl + "/api/users/register", {
      method: "POST",

      body: formData
    })
      .then((response) => response.json())
      .then(result => {
        if (result.err) {
          console.log("error in signup fetch react", result.error);
          setError(result.err)
        } else if (result.acknowledged === true && result.insertedId) {
          setSuccess("account created successfuly, please login")
          setError("")
          setName("")
          setEmail("")
          setPassword("")
          navigate("/login")
        }
      })
  }

  return (
    <main className="singup-page">
      <h1>Registrieren</h1>
      <section className="from-container">
        <form>
          <label>
            Name
            <input type="text" placeholder="Full Name" value={name} onChange={(e) => setName(e.target.value)} />
          </label>
          <label>
            E-Mail
            <input type="email" placeholder="E-Mail" value={email} onChange={(e) => setEmail(e.target.value)} />
          </label>
          <label>
            Passwort
            <input type="password" placeholder="Passwort" value={password} onChange={(e) => setPassword(e.target.value)} />
          </label>
          <div className="add-btn-file">
            <label>
              {" "}
              User Foto
              <div className="add-photo center">
                <PlusIcon />
                <p>Foto Hinzufügen</p>
                <input type="file" onChange={(e) => setAvatar(e.target.files[0])} />
              </div>
            </label>
          </div>

          <motion.button className="btn-blue" onClick={register} type="submit"
            whileHover={{
              scale: 1.1
            }}>
            Registrieren
          </motion.button>
          {error && <p>{error}</p>}
          {success && <p>{success}</p>}
        </form>
      </section>
      <p>
        Du hast bereits einen Account?{" "}
        <span>
          {" "}
          <Link to="/login">Hier Login</Link>{" "}
        </span>
      </p>
    </main>
  );
};

export default SingUp;
