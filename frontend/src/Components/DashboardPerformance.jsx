import { Box } from '@mui/material'
import React from 'react'
import DashboardGraph from './DashboardGraph'
import PortfolioDiversity from './PortfolioDiversity'
import PerformanceCards from './PerformanceCards'
import { data } from "../utils/MockPieChartData"
import { generateData } from '../utils/MockOverallPerformanceData'

const DashboardPerformance = () => {
  return (
    <div>
        <Box>
          <PerformanceCards></PerformanceCards>
        </Box>
        
        <div style={{display: "flex", justifyContent: "space-around", paddingTop: "40px", paddingLeft: "19px", paddingRight: "4px", paddingBottom: "50px"}}>
          <Box style={{width: "62%", height: "30%", borderRadius: "10px", margin: "4px", backgroundColor: "white", boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px"}}>
            <DashboardGraph generateData={generateData}></DashboardGraph>
          </Box>

          <Box style={{width: "32%", height: "30%", borderRadius: "10px", margin: "4px", backgroundColor: "white", boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px"}}>
            <PortfolioDiversity data={data}></PortfolioDiversity>
          </Box>
        </div>
    </div>
  )
}

export default DashboardPerformance