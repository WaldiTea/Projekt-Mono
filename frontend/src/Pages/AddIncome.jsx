import "./AddIncome.css";
import HeaderLine from "../Components/HeaderLine";
import PlusIcon from "../Components/Icons_Component/PlusIcon";
import Navbar from "../Components/Navbar";
import { apiUrl } from "../api/api";
import { useState } from "react"
import { useNavigate } from "react-router-dom";
const AddIncome = (props) => {
  const [name, setName] = useState("")
  const [amount, setAmount] = useState(0)
  const [created_at, setCreated_at] = useState()
  const [image, setImage] = useState()

  const navigate = useNavigate()

  const addIncome = (event) => {
    event.preventDefault()

    const formData = new FormData()
    formData.set("name", name)
    formData.set("amount", amount)
    formData.set("created_at", created_at)
    formData.set("income", true)
    formData.set("image", image)

    fetch(apiUrl + "/api/transactions/add", {
      method: "POST",
      headers: {
        token: "JWT " + props.token
      },
      body: formData
    })
      .then((response) => response.json())
      .then((data) => {
        if (data._id) {
          navigate("/home")
        }
      })
  }
  return (
    <main className="add-income">
      <div className="header">
        <HeaderLine title="Einnahme hinzufügen" />
      </div>
    
      <section>
        <form>
          <label>
            Name
            <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
          </label>
          <label>
            Betrag
            <input type="number" value={amount} onChange={(e) => setAmount(e.target.value)} />
          </label>
          <label>
            Datum
            <input type="datetime-local" value={created_at} onChange={(e) => setCreated_at(e.target.value)} />
          </label>
          
          <div className="add-btn-file">
            <label>
              {" "}
              User Foto
              <div className="add-photo center">
                <PlusIcon />
                <p>Foto Hinzufügen</p>
                <input type="file" onChange={(e) => setImage(e.target.files[0])} />
              </div>
            </label>
          </div>

          <button type="submit" className="btn-blue" onClick={addIncome}>
            Speichern
          </button>
        </form>
      </section>
      <Navbar />
    </main>
  );
};

export default AddIncome;
