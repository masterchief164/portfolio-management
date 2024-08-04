import Box from "@mui/material/Box";
import AssetRow from "../../Components/AssetRow.jsx";

const HomePage = () => {
    const rows = Array.from({ length: 50}, (_, i) => i + 1);
    return (
        <Box sx={{overflowY: 'hidden'}}>
            <h1>Home Page</h1>
            <Box sx={{display: 'flex',flexDirection:'column', gap: '5px'}}  px={'10px'}>
                {rows.map((i) => {
                    return <AssetRow key={i}/>;
                })}
            </Box>
        </Box>
    );
};

export default HomePage;