import { Box, Typography } from '@mui/material';
import { Doughnut } from 'react-chartjs-2';
import {useSelector} from "react-redux";
import {useEffect, useState} from 'react';
import { get_pm_sector_alloc, get_user_sector_alloc } from '../utils/user_utils';

const PortfolioDiversity = () => {
    const selectedUser = useSelector((store) => store.user.selectedUser);
    const [data,setData] = useState([]);
    const options = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                position: 'top',
            },
            tooltip: {
                callbacks: {
                    label: function(tooltipItem) {
                        return tooltipItem.label + ': ' + tooltipItem.raw.toFixed(2) + '%';
                    }
                }
            }
        }
    };

    useEffect(() => {
        (async function () {
            let res;
            if(selectedUser.ispm === true)
                res = await get_pm_sector_alloc(selectedUser.id);
            else
                res = await get_user_sector_alloc(selectedUser.id);

            const labels = res?.map((d) => d.sector);
            const dataValues = res?.map((d) => d.perc_alloc);
            setData({
                labels: labels,
                datasets: [
                    {
                        label: "Portfolio Allocation",
                        data: dataValues,
                        borderWidth: 1
                    }
                ]
            });
        })();
    }, [selectedUser]);

    if(data.length === 0)
        return <div> Loading </div>;
    return (
        <Box sx={{ padding: '20px', display: 'flex', flexDirection: 'column', height: '100%', overflow: 'hidden', maxWidth: '100%', }}>
            <Typography variant='h6' fontWeight="500">Portfolio Diversity</Typography>

            <Box sx={{ marginTop: '5px', paddingBottom: "5px", flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <div style={{ width: '90%', height: '90%' }}>
                    <Doughnut data={data} options={options} />
                </div>
            </Box>
        </Box>
    );
};

export default PortfolioDiversity;
