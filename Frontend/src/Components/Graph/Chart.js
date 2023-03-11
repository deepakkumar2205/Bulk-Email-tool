import React, { useContext, useEffect, useState } from "react";
import Chart from "react-apexcharts";
import Context from "../../Context/Context";
import { graphDataAxios } from "../../Services/axios";

function ChartComp(props) {
  // 
  const contextDate = useContext(Context);
  const selectedDate = contextDate.timeStamp[0];
  // const sd=selectedDate.startDate
  let ed=selectedDate.endDate
  ed = new Date(new Date(ed).setDate(new Date().getDate()+1))
  // if(+sd === +ed){
  // }
  // console.log({...new Date(new Date("2023-03-08T18:30:00.000Z").setDate(new Date().getDate()+1)),endDate:ed});
  const [plotData, setPlotData] = useState({
    date:[],
    count:[]
  });

  useEffect(()=>{
    graphDataAxios({...contextDate.timeStamp[0],endDate:ed})
    .then((res)=>{
      let dataArr=res.data.data;
      let date=[];
      let count=[];
      dataArr.forEach((obj)=>{
        const stamp = new Date(obj.time)
          date.push(`${stamp.getDate()} ${stamp.toLocaleString('en-US', { month: 'short' })}  ${stamp.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true })}`)
          count.push(obj.mailCount)
      })
      setPlotData({date:date , count: count})
    })
    .catch((err)=>console.log(err))
  },[contextDate.timeStamp])


  let options = {
    options: {
      chart: {
        id: "basic-bar"
      },
      xaxis: {
        categories: plotData.date
      }
    },
    series: [
      {
        name: "Email Sent",
        data: plotData.count
      }
    ]
  }

  let donutData ={
    series: plotData.count,
    options: {
      chart: {
        type: 'donut',
      },
      labels: plotData.date,
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
        {props.graphType !== 'donut'? <div className="app w-100" >
          <div className="row">
            <div className="mixed-chart">
              <Chart
                options={options.options}
                series={options.series}
                type={props.graphType !== 'donut'? props.graphType : 'line'}
                width="100%"
                height={window.innerHeight <= 900 ?'500':''}
              />
            </div>
          </div>
        </div> : 
         <div className="donut m-5 w-100">
         <Chart
           options={donutData.options}
           series={donutData.series}
           type="donut"
           width="100%"
           height='500'
         />
       </div>
       }
      </>
    );
  }


export default ChartComp;