import React from 'react';
import Chart from 'chart.js';
import {Line} from 'react-chartjs-2';

const PriceChart = (props) => {
  // console.log('props are', props);
  let newData = [];
  let labels = [];
  let mangleData = () => {
    for (let key in props.data){
      // newData.push({
      //   'date': key,
      //   'price': props.data[key]
      // });
      labels.push(key);
      newData.push(props.data[key]);
    }
  }
  mangleData();
  // console.log('new data is', newData, 'labels are', labels);
  let state = {
    labels: labels,
    datasets: [
      {
        label: 'Daily Closing Price',
        fill: false,
        lineTension: 0.5,
        backgroundColor: 'rgba(75,192,192,1)',
        borderColor: 'rgba(0,0,0,1)',
        borderWidth: 2,
        data: newData
      }
    ]
  }
  // console.log('state');
  return (
    <div id='lineChart'>
        <Line
          data={state}
          options={{
            title:{
              display:true,
              text:'Bitcoin Daily Closing Price',
              fontSize:20
            },
            legend:{
              display:true,
              position:'right'
            },
          }}
        />
      </div>

  );
}

export default PriceChart;