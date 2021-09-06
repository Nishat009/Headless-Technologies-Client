import React, { useState, useEffect } from "react";
import { Line } from "react-chartjs-2";
import axios from "axios";
import moment from "moment";

const Chart = (data) => {
  const [chartData, setChartData] = useState({});
  const [gallery, setGallery] = useState([]);
  const chart = () => {
    let meme = [gallery.length];
    axios
      .get("https://tranquil-forest-75801.herokuapp.com/memes")
      .then(res => {
        console.log(res);
        setGallery(res);
        setChartData({
          labels: [moment().format('ll'), moment().add(1, 'days').format('ll'), moment().add(2, 'days').format('ll'), moment().add(3, 'days').format('ll'),moment().add(4, 'days').format('ll'),moment().add(5, 'days').format('ll'), moment().add(6, 'days').format('ll')],
          datasets: [
            {
              label: "level of upload meme",
              data: meme,
              backgroundColor: ["pink"],
              borderWidth: 4,
              height: 240
            }
          ]
        });
      })
      .catch(err => {
        console.log(err);
      });
    console.log(meme);
  };

  useEffect(() => {
    chart();
  }, []);
  return (
    <div className="Container" style={{margin:"0px 150px 150px 150px"}}  >
       
        <h1 className="Container text-center bg-info mt-1 mx-auto" style={{ width:"300px"}}>Stats</h1>
      <h3>Meme upload per day last 7 days</h3>
      <div className="" >
        <Line 
          data={chartData}
          options={{
            responsive: true,
           
            scales: {
              yAxes: [
                {
                  ticks: {
                    autoSkip: true,
                    maxTicksLimit: 10,
                    beginAtZero: true,
                    
                  },
                  gridLines: {
                    display: false
                  }
                }
              ],
              xAxes: [
                {
                  gridLines: {
                    display: false
                  }
                }
              ]
            }
          }}
        />
      </div>
    </div>
  );
};

export default Chart;