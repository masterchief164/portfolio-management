import Box from "@mui/material/Box";
import AssetRow from "../../Components/AssetRow.jsx";
import DashboardPerformance from "../../Components/DashboardPerformance.jsx";

const HomePage = () => {
    return (
        <Box sx={{overflowY: 'hidden', backgroundColor: "#F4F7FF", marginTop: "-42px", marginLeft: "-10px", marginRight: "-8px"}}>
            <DashboardPerformance></DashboardPerformance>
        </Box>
    );
};

export default HomePage;