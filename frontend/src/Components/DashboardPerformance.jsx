import { Box, useMediaQuery, useTheme } from '@mui/material';
import DashboardGraph from './DashboardGraph';
import PortfolioDiversity from './PortfolioDiversity';
import PerformanceCards from './PerformanceCards';
// import { data } from "../utils/MockPieChartData";
import { generateData } from '../utils/MockOverallPerformanceData';

const DashboardPerformance = () => {
    const theme = useTheme();
    const isMediumUp = useMediaQuery(theme.breakpoints.up('lg')); // Check if the screen is medium or larger

    return (
        <div>
            <Box>
                <PerformanceCards />
            </Box>
            
            <div style={{display: "flex", justifyContent: "space-around", paddingTop: "40px", paddingLeft: "19px", paddingRight: "4px", paddingBottom: "50px"}}>
                {isMediumUp ? (
                    <>
                        <Box sx={{width: {lg: "62%", xl: "55%"}, height: {lg: 350, xl: 450}, borderRadius: "10px", margin: "4px", backgroundColor: "white", boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px"}}>
                            <DashboardGraph generateData={generateData} />
                        </Box>

                        <Box sx={{width: {lg: "32%", xl: "35%"}, height: {lg: 350, xl: 450}, borderRadius: "10px", margin: "4px", backgroundColor: "white", boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px"}}>
                            <PortfolioDiversity />
                        </Box>
                    </>
                ) : (
                    <Box sx={{width: "80%", height: {xs: 400, sm: 400, md: 400}, borderRadius: "10px", margin: "4px", backgroundColor: "white", boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px"}}>
                        <PortfolioDiversity />
                    </Box>
                )}
            </div>
        </div>
    );
};

export default DashboardPerformance;
