import { Box, Typography } from '@mui/material';
import { useMediaQuery, useTheme } from '@mui/material';
import { useSelector } from 'react-redux';
import { get_pm_invest, get_pm_val, get_user_invest, get_user_val } from '../utils/user_utils';
import { useEffect, useState } from 'react';

const PerformanceCards = () => {
    const selectedUser = useSelector((store) => store.user.selectedUser);
    const [totalInvestment, setTotalInvestment] = useState(0);
    const [currentValue, setCurrentValue] = useState(0);
    const [overallGains, setOverallGains] = useState(0);
    const [percReturns, setPercReturns] = useState(0);
    const [returnsColor, setReturnsColor] = useState("#2bb919");

    useEffect(() => {
        const getData = async() => {
            var total_investment, current_value, overall_gains, perc_returns;
            if(selectedUser?.ispm) {
                total_investment = await get_pm_invest(selectedUser.id);
                current_value = await get_pm_val(selectedUser.id);
                overall_gains = current_value - total_investment;
                if(overall_gains < 0) setReturnsColor("#e31712"); 
                else setReturnsColor("#2bb919");
                perc_returns = (overall_gains / total_investment * 100).toLocaleString() + "%";
                overall_gains = "$" + overall_gains.toLocaleString();
                total_investment =  "$" + total_investment.toLocaleString();
                current_value =  "$" + current_value.toLocaleString();
            }else {
                total_investment = await get_user_invest(selectedUser.id);
                current_value = await get_user_val(selectedUser.id);
                overall_gains = current_value - total_investment;
                if(overall_gains < 0) setReturnsColor("#e31712");
                perc_returns = (overall_gains / total_investment * 100).toLocaleString() + "%";
                overall_gains = "$" + overall_gains.toLocaleString();
                total_investment = "$" + total_investment.toLocaleString();
                current_value = "$" + current_value.toLocaleString();
            }
            setTotalInvestment(total_investment);
            setCurrentValue(current_value);
            setOverallGains(overall_gains);
            setPercReturns(perc_returns);

        };
        getData();
    }, [selectedUser]); 

    // console.log(selectedUser);
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
                    <Card title="Total Investment" value={totalInvestment} />
                    <Card title="Current Value" value={currentValue} />
                    <Card title="Overall Gain/Loss" value={overallGains} color={returnsColor} />
                    <Card title="Returns (%)" value={percReturns} color={returnsColor} />
                </>
            )}
            {isLgUp && !isXlUp && (
                <>
                    <Card title="Total Investment" value={totalInvestment} />
                    <Card title="Current Value" value={currentValue} />
                    <Card title="Overall Gain/Loss" value={overallGains} color={returnsColor} />
                    {/* <Card title="Returns (%)" value="+28.96%" color="#2bfe27" /> */}
                </>
            )}
            {isMdUp && !isLgUp && (
                <>
                    <Card title="Total Investment" value={totalInvestment} />
                    <Card title="Current Value" value={currentValue} />
                    {/* <Card title="Overall Gain/Loss" value="+$1,736,310" color="#2bfe27" /> */}
                </>
            )}
            {isSmUp && !isMdUp && (
                <>
                    <Card title="Total Investment" value={totalInvestment} />
                    <Card title="Current Value" value={currentValue} />
                </>
            )}
            {!isSmUp && (
                <div style={{margin: "auto"}}>
                    <Card title="Total Investment" value={totalInvestment} />
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
