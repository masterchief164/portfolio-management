import {Card, Box} from "@mui/material";
import Typography from "@mui/material/Typography";
import ProgressBar from "./ProgressBar.jsx";

const AssetRow = () => {
    return (
        <Card variant='elevation' elevation={5} sx={{borderRadius: '8px'}}>
            <Box sx={{display:'flex', flexDirection: 'row',height: '60px', justifyContent: 'space-between', alignItems: 'center'}} px={'25px'}>
                <Typography>REL</Typography>
                <Typography>Reliance</Typography>
                <Box width={'200px'} borderRadius={'50%'}>
                    <ProgressBar progress={'50'}/>
                </Box>
            </Box>
        </Card>
    );
};

export default AssetRow;