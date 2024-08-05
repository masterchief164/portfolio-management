import { Box } from '@mui/material'
import React from 'react'
import DashboardGraph from './DashboardGraph'
import PortfolioDiversity from './PortfolioDiversity'

const DashboardPerformance = () => {
  return (
    <div style={{display: "flex", justifyContent: "space-around", paddingTop: "40px", paddingLeft: "19px", paddingRight: "4px", paddingBottom: "50px"}}>
        <Box style={{width: "62%", height: "auto", borderRadius: "10px", margin: "4px", backgroundColor: "white", boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px"}}>
          <DashboardGraph></DashboardGraph>
        </Box>

        <Box style={{width: "32%", height: "auto", borderRadius: "10px", margin: "4px", backgroundColor: "white", boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px"}}>
          <PortfolioDiversity></PortfolioDiversity>
        </Box>
    </div>
  )
}

export default DashboardPerformance