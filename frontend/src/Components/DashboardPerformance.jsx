import { Box } from '@mui/material'
import React from 'react'
import DashboardGraph from './DashboardGraph'

const DashboardPerformance = () => {
  return (
    <div style={{display: "flex", justifyContent: "space-around", paddingTop: "30px", paddingLeft: "19px", paddingRight: "4px", paddingBottom: "50px"}}>
        <Box style={{width: "62%", height: "auto", borderRadius: "10px", margin: "4px", backgroundColor: "white"}}>
            <DashboardGraph></DashboardGraph>
        </Box>

        <Box style={{width: "32%", height: "auto", borderRadius: "10px", margin: "4px", paddingRight: "19px", backgroundColor: "white"}}>

        </Box>
    </div>
  )
}

export default DashboardPerformance