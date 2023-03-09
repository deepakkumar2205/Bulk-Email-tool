import React, { Component } from "react";
import Chart from "react-apexcharts";

function ChartComp(props) {
  let options = {
    options: {
      chart: {
        id: "basic-bar"
      },
      xaxis: {
        categories: [1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998, 1999,1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998, 1999,30, 40, 45, 50, 49, 60, 70, 91]
      }
    },
    series: [
      {
        name: "series-1",
        data: [30, 40, 45, 50, 49, 60, 70, 91,30, 40, 45, 50, 49, 60, 70, 91, 30, 40, 45, 50, 49, 60, 70, 91]
      }
    ]
  }

  let donutData ={
    series: [44, 55, 41, 17, 15],
    options: {
      chart: {
        type: 'donut',
      },
      labels: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      responsive: [{
        breakpoint: 480,
        options: {
          chart: {
            width: 200
          },
          legend: {
            position: 'bottom'
          }
        }
      }]
    }}

    return (
      <>
        {props.graphType !== 'donut'? <div className="app w-100">
          <div className="row">
            <div className="mixed-chart">
              <Chart
                options={options.options}
                series={options.series}
                type={props.graphType !== 'donut'? props.graphType : 'line'}
                width="100%"
              />
            </div>
          </div>
        </div> : 
         <div className="donut m-5">
         <Chart
           options={donutData.options}
           series={donutData.series}
           type="donut"
           width="680"
           height='500'
         />
       </div>
       }
      </>
    );
  }


export default ChartComp;