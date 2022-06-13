/* eslint-disable react-hooks/exhaustive-deps */
import "./StatistikSection.css";

import Diagramm from "./Diagramm";

import { useState, useEffect } from "react";
import { apiUrl } from "../api/api";

// import { UserData } from "../Data";

const StatistikSection = (props) => {
  const [showOption, setShowOption] = useState("income");
  const [timeOption, setTimeOption] = useState("Woechentlich");


  useEffect(() => {
    const fetchTransactionsData = async () => {
      await fetch(
        apiUrl + "/api/users/statistics/" + showOption + "/" + timeOption,
        {
          headers: {
            token: "JWT " + props.token,
          },
        }
      )
        .then((response) => response.json())
        .then((data) => {
          props.setTransactionData(data);
        });
    };
    fetchTransactionsData();
  }, [showOption, timeOption]);

  // console.log(transactionData);

  var userData = {
    labels: props.transactionData?.resultArray?.map((data) => data.label),

    datasets: [
      {
        label: showOption === "income" ? "Einnahmen" : "Ausgaben",

        data: props.transactionData?.resultArray?.map((data) => data.value),
        fill: true,
        backgroundColor: "#2b47fc42",
        borderColor: "#2b47fc",
        tension: 0.4,
        radius: 3,
        hoverRadius: 10,
        pointBackgroundColor: "#2b47fc",
        borderWidth: 2,

      },
    ],
  };

  return (
    <section>
      <div className="navigation-stat">
        <button
          value="Woechentlich"
          onClick={(e) => setTimeOption(e.target.value)}
          className={timeOption === "Woechentlich" ? "selected-time" : null}
        >
          Woche
        </button>
        <button
          value="Monatlich"
          onClick={(e) => setTimeOption(e.target.value)}
          className={timeOption === "Monatlich" ? "selected-time" : null}
        >
          Monat
        </button>
        <button
          value="Jaehrlich"
          onClick={(e) => setTimeOption(e.target.value)}
          className={timeOption === "Jaehrlich" ? "selected-time" : null}
        >
          Jahr
        </button>
      </div>

      <div>
        <select
          value={showOption}
          onChange={(e) => {
            setShowOption(e.target.value);
          }}
          className="select-start"
        >
          <option value="income">Einnahmen</option>
          <option value="expens">Ausgaben</option>
        </select>
      </div>

      <Diagramm chartData={userData} />
      <h4> {timeOption + "e"} {showOption === "income" ? "Einnahmen" : "Ausgaben"}</h4>
    </section>
  );
};

export default StatistikSection;
