import "./Diagramm.css"
import React from "react";

import { Line } from "react-chartjs-2";
import { Chart as ChartJS } from "chart.js/auto";

const Diagramm = ({chartData}) => {
  
  return (
    <section className="diagram">
     <article>
            <Line data={chartData} />
     </article>
    </section>
  );
};

export default Diagramm;
