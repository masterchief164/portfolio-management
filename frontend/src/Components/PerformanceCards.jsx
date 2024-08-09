import { Box, Typography } from '@mui/material';
import { useMediaQuery, useTheme } from '@mui/material';

const PerformanceCards = () => {
    const theme = useTheme();
    const isXlUp = useMediaQuery(theme.breakpoints.up('xl'));
    const isLgUp = useMediaQuery(theme.breakpoints.up('lg'));
    const isMdUp = useMediaQuery(theme.breakpoints.up('md'));
    const isSmUp = useMediaQuery(theme.breakpoints.up('sm'));

    return (
        <Box
            sx={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: '20px',
                padding: '20px 35px',
                justifyContent: 'space-between',
                
            }}
        >   {isXlUp && (
                <>
                    <Card title="Total Investment" value="$1,473,980" />
                    <Card title="Current Value" value="$3,210,290" />
                    <Card title="Overall Gain/Loss" value="+$1,736,310" color="#2bfe27" />
                    <Card title="Returns (%)" value="+28.96%" color="#2bfe27" />
                </>
            )}
            {isLgUp && !isXlUp && (
                <>
                    <Card title="Total Investment" value="$1,473,980" />
                    <Card title="Current Value" value="$3,210,290" />
                    <Card title="Overall Gain/Loss" value="+$1,736,310" color="#2bfe27" />
                    {/* <Card title="Returns (%)" value="+28.96%" color="#2bfe27" /> */}
                </>
            )}
            {isMdUp && !isLgUp && (
                <>
                    <Card title="Total Investment" value="$1,473,980" />
                    <Card title="Current Value" value="$3,210,290" />
                    {/* <Card title="Overall Gain/Loss" value="+$1,736,310" color="#2bfe27" /> */}
                </>
            )}
            {isSmUp && !isMdUp && (
                <>
                    <Card title="Total Investment" value="$1,473,980" />
                    <Card title="Current Value" value="$3,210,290" />
                </>
            )}
            {!isSmUp && (
                <div style={{margin: "auto"}}>
                    <Card title="Total Investment" value="$1,473,980" />
                    {/* <Card title="Current Value" value="$3,210,290" /> */}
                </div>
            )}
        </Box>
    );
};

const Card = ({ title, value, color }) => (
    <Box
        sx={{
            backgroundColor: 'white',
            boxShadow: 'rgba(0, 0, 0, 0.35) 0px 5px 15px',
            padding: '10px',
            flex: '1 1 21%', // Flex basis for responsiveness
            minWidth: '200px', // Ensure minimum width
            maxWidth: '24%', // Control maximum width
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            textAlign: 'center'
        }}
    >
        <Typography variant='h5' color="#2d88fd">{title}</Typography>
        <Typography variant='h5' fontWeight="500" color={color || "inherit"}>{value}</Typography>
    </Box>
);

export default PerformanceCards;
