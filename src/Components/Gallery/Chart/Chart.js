import React, { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import axios from "axios";

const Chart = () => {
  const [gallery, setGallery] = useState([]);

  const [chartData, setChartData] = useState({});

  const barChart = () => {
    let b = [];
    let a = [];
    axios
      .get("https://tranquil-forest-75801.herokuapp.com/memes")
      .then((res) => {
        console.log(res.data);
        setGallery(res.data);

        for (const dataObj of res.data) {
          a.push(dataObj.time);
         
        }
        setChartData({
          labels: a,
          datasets: [
            {
              label: "Scale",
              data: b,
              backgroundColor: [
                "rgba(255, 99, 132, 0.2)",
                "rgba(54, 162, 235, 0.2)",
                "rgba(255, 206, 86, 0.2)",
                "rgba(75, 192, 192, 0.2)",
                "rgba(153, 102, 255, 0.2)",
                "rgba(255, 159, 64, 0.2)",
              ],
              borderColor: [
                "rgba(255, 99, 132, 1)",
                "rgba(54, 162, 235, 1)",
                "rgba(255, 206, 86, 1)",
                "rgba(75, 192, 192, 1)",
                "rgba(153, 102, 255, 1)",
                "rgba(255, 159, 64, 1)",
              ],
              borderWidth: 1,
            },
          ],
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const options = {
    scales: {
      yAxes: [
        {
          ticks: {
            beginAtZero: false,
          },
        },
      ],
    },
  };
  useEffect(() => {
    barChart();
  }, []);
  // const [data, setData] = useState(genData());

  return (
    <div className="Container" style={{ margin: "0px 150px 150px 150px" }}>
      <div>
        <h1
          className="Container text-center bg-info mt-1 mx-auto"
          style={{ width: "300px" }}
        >
          Stats
        </h1>
        <h3>Meme upload per day last 7 days</h3>
      </div>
      <Bar data={chartData} options={options} />
    </div>
  );
};

export default Chart;
