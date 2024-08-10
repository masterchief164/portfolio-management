import Box from "@mui/material/Box";
import DashboardPerformance from "../../Components/DashboardPerformance.jsx";
import AssetAllocationTable from "../../Components/AssetAllocationTable.jsx";
import { Grid, Paper } from '@mui/material';
import WatchlistTable from "../../Components/WatchList.jsx";
import TransactionTable from "../../Components/TransactionTable.jsx";

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

    const demoData = [
      {
        userName: 'Alice Johnson',
        assetName: 'Tesla Inc',
        assetSymbol: 'TSLA',
        timestamp: '2024-08-10T12:00:00Z',
        quantity: 50,
        pricePerUnit: 700.00,
      },
      {
        userName: 'Bob Smith',
        assetName: 'Apple Inc',
        assetSymbol: 'AAPL',
        timestamp: '2024-08-09T09:30:00Z',
        quantity: 100,
        pricePerUnit: 175.00,
      },
      {
        userName: 'Carol Lee',
        assetName: 'Microsoft Corp',
        assetSymbol: 'MSFT',
        timestamp: '2024-08-08T14:45:00Z',
        quantity: 75,
        pricePerUnit: 320.00,
      },
      {
        userName: 'David Brown',
        assetName: 'Amazon.com Inc',
        assetSymbol: 'AMZN',
        timestamp: '2024-08-07T16:20:00Z',
        quantity: 30,
        pricePerUnit: 3300.00,
      },
      {
        userName: 'Emily Davis',
        assetName: 'Alphabet Inc',
        assetSymbol: 'GOOGL',
        timestamp: '2024-08-06T11:10:00Z',
        quantity: 20,
        pricePerUnit: 2800.00,
      },
    ];    

const user = false;
const HomePage = () => {
    return (
      // <Container>
      <div>
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
                  {/* if user is true, show watchlist */}
                  {user && <WatchlistTable data={watchlistData} />}
                  {/* else transaction */}
                  {!user && <TransactionTable data={demoData} />}
                </div>
              </Paper>
            </Grid>
            
          </Grid>
        </Grid>
{/* </Container> */}
</div>
    );
};

export default HomePage;