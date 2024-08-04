import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

const ProgressBar = ({progress = '10'}) => {
    return (
        <Box sx={{display: 'flex', flexDirection:'row', alignItems: 'center', gap: '10px'}}>
            <Typography>{progress}</Typography>
        <Box bgcolor={'black'} width={'100%'} height={'10px'} borderRadius={'25px'}>
            <Box bgcolor={'gray'}  width={`${progress}%`} height={'100%'} borderRadius={'25px 0 0 25px'}></Box>
        </Box>
        </Box>
    );
};

export default ProgressBar;