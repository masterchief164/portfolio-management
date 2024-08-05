import Box from "@mui/material/Box";
import AssetRow from "../../Components/AssetRow.jsx";
import DashboardPerformance from "../../Components/DashboardPerformance.jsx";
import AssetAllocationTable from "../../Components/AssetAllocationTable.jsx";
import { Container, Grid, Paper, Typography } from '@mui/material';
import WatchlistTable from "../../Components/WatchList.jsx";

const assetData = [
    { name: 'Apple Inc.', symbol: 'AAPL', price: '$150.00', totalValueHeld: '$15,000.00', percentageOfAllocation: '30%', quantity: 100 },
    { name: 'Microsoft Corp.', symbol: 'MSFT', price: '$280.00', totalValueHeld: '$28,000.00', percentageOfAllocation: '40%', quantity: 100 },
    { name: 'Tesla Inc.', symbol: 'TSLA', price: '$700.00', totalValueHeld: '$14,000.00', percentageOfAllocation: '20%', quantity: 20 },
    { name: 'Google LLC', symbol: 'GOOGL', price: '$2,500.00', totalValueHeld: '$10,000.00', percentageOfAllocation: '10%', quantity: 4 }
  ];
const watchlistData = [
    {
      User_name: 'Alice Johnson',
      Asset_name: 'Apple Inc.',
      Price_per_unit: '$175.30',
      Timestamp: '2024-08-01 14:30'
    },
    {
      User_name: 'Bob Smith',
      Asset_name: 'Tesla Inc.',
      Price_per_unit: '$680.75',
      Timestamp: '2024-08-01 15:00'
    },
    {
      User_name: 'Charlie Brown',
      Asset_name: 'Microsoft Corp.',
      Price_per_unit: '$310.55',
      Timestamp: '2024-08-01 16:15'
    },
    {
      User_name: 'Diana Prince',
      Asset_name: 'Amazon.com Inc.',
      Price_per_unit: '$135.90',
      Timestamp: '2024-08-01 17:45'
    }
    ];
  
const HomePage = () => {
    return (
      <Container>
      <Grid>
      <Box sx={{overflowY: 'hidden', backgroundColor: "#F4F7FF", marginTop: "-42px", marginLeft: "-10px", marginRight: "-8px"}}>
            <DashboardPerformance></DashboardPerformance>
      </Box>
      </Grid>
      
        {/* Bottom Section with Asset Allocation Table */}
        <Grid container spacing={2} style={{ flexGrow: 1, marginLeft: 'auto' }}>
          <Grid container spacing={2} style={{ flex: '1 1 auto', marginTop: '16px' }}>
            
            <Grid item xs={12} md={7} style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
              <Paper style={{ padding: '16px', flex: '1', display: 'flex', flexDirection: 'column' }}>
                <div style={{ flexGrow: 1, overflow: 'auto' }}>
                  <AssetAllocationTable data={assetData} />
                </div>
              </Paper>
            </Grid>
            
            <Grid item xs={12} md={5} style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
              <Paper style={{ padding: '16px', flex: '1', display: 'flex', flexDirection: 'column' }}>
                <div style={{ flexGrow: 1, overflow: 'auto' }}>
                  <WatchlistTable data={watchlistData} />
                </div>
              </Paper>
            </Grid>
            
          </Grid>
        </Grid>
</Container>
    );
};

export default HomePage;