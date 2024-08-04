import Box from "@mui/material/Box";
import AssetRow from "../../Components/AssetRow.jsx";
import DashboardPerformance from "../../Components/DashboardPerformance.jsx";

const HomePage = () => {
    const rows = Array.from({ length: 50}, (_, i) => i + 1);
    return (
        // <Box sx={{overflowY: 'hidden'}}>
        //     <h1>Home Page</h1>
        //     <Box sx={{display: 'flex',flexDirection:'column', gap: '5px'}}  px={'10px'}>
        //         {rows.map((i) => {
        //             return <AssetRow key={i}/>;
        //         })}
        //     </Box>
        // </Box>
        // <div style={{backgroundColor: "#D5E5FF", marginTop: "-60px", marginLeft: "-20px", marginRight: "-10px"}}>
        //     <div>
        //         <DashboardPerformance />
        //     </div>
        // </div>
        <Box sx={{overflowY: 'hidden', backgroundColor: "#F4F7FF", marginTop: "-42px", marginLeft: "-10px", marginRight: "-8px"}}>
            <DashboardPerformance></DashboardPerformance>
        </Box>
    );
};

export default HomePage;