import React from 'react';
import { LineChart} from 'react-chartkick';
import 'chart.js';



export default function Chart(props) {

      return <LineChart width="100%"  height="500px" xtitle="Time" ytitle="Price" colors={["#0088cc", "#979797"]} data={props.data} />
   
};