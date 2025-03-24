import React from 'react'
import './side.css'
import { BiHomeAlt, BiBarChartAlt2,  BiLineChart, BiPieChartAlt , BiCog  } from "react-icons/bi"; 

const Side = () => {
  return (
    <div className='side'>
        <ul>
            <li> <BiHomeAlt />Dashboard</li>
            <li> <BiBarChartAlt2/>Portfolio</li>
            <li>< BiLineChart  />Analytics</li>
            <li><BiPieChartAlt  /> Reports</li>
            <li> <BiCog />Settings</li>
        </ul>
    </div>
  )
}

export default Side
