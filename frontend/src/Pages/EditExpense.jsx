import "./AddExpense.css";
import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom";
import HeaderLineTrash from "../Components/HeaderLineTrash";
import PlusIcon from "../Components/Icons_Component/PlusIcon";
import Navbar from "../Components/Navbar";
import { apiUrl } from "../api/api";
import React from 'react'


const EditExpense = (props) => {
  const { transactionId } = useParams("transactionId")

  const [name, setName] = useState("")
  const [amount, setAmount] = useState(0)
  const [created_at, setCreated_at] = useState()
  const [image, setImage] = useState()

  const navigate = useNavigate()

  useEffect(() => {

    fetch(apiUrl + "/api/transactions/" + transactionId, {
      headers: {
        token: "JWT " + props.token
      }
    })
      .then(response => response.json())
      .then(data => {
        setName(data.foundTransaction.name)
        setAmount(data.foundTransaction.amount)
        setCreated_at(new Date(data.foundTransaction.created_at).toISOString().substring(0, 16)) //2022-05-26T12:23
        setImage(data.foundTransaction.image)
      })
  }, [props.token, transactionId])

  const edit = (event) => {
    event.preventDefault()

    const formData = new FormData()
    formData.set("name", name)
    formData.set("amount", amount)
    formData.set("created_at", created_at)
    formData.set("income", false)

    fetch(apiUrl + "/api/transactions/edit/" + transactionId, {
      method: "PUT",
      headers: {
        token: "JWT " + props.token
      },
      body: formData
    })
      .then((response) => response.json())
      .then((result) => {
        if (result.acknowledged) {
          navigate("/home")
        }
      })
  }
  return (
    <main className="add-expense">
      <div className="header">
        <HeaderLineTrash title="Ausgabe Bearbeiten" token={props.token} transactionId={transactionId}/>
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

          {/* <AddPhotoBtn label="Foto Hinzufügen" text="Foto Hinzufügen" /> */}
          <div className="add-btn-file">
            <label>
              {" "}
              Foto bearbeiten
              <div className="add-photo center">
                <PlusIcon />
                <p>Foto Bearbeiten</p>
                <input type="file" onChange={(e) => setImage(e.target.files[0])} />
              </div>
            </label>
          </div>

          <button type="submit" className="btn-blue" onClick={edit}>
            Speichern
          </button>
        </form>
      </section>
      <Navbar />
    </main>
  );
};

export default EditExpense;
