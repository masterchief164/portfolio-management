import Box from "@mui/material/Box";
import DashboardPerformance from "../../Components/DashboardPerformance.jsx";
import AssetAllocationTable from "../../Components/AssetAllocationTable.jsx";
import { Grid, Paper } from '@mui/material';
import WatchlistTable from "../../Components/WatchList.jsx";
import TransactionTable from "../../Components/TransactionTable.jsx";
import {useEffect, useState} from "react";
import {getUserAssets, getPmAssets} from "../../utils/httpClient.js";
import {useSelector} from "react-redux";

const id = 3;
const HomePage = () => {
  const [assets, setAssets] = useState([]);
  const selectedUser = useSelector((store) => store.user.selectedUser);

  useEffect(() => {
      if(!selectedUser.ispm) {
          getUserAssets(id).then((data) => {
              setAssets(data);
          });
      } else {
          getPmAssets(2).then((data) => {
              setAssets(data);
          });
      }
  }, [selectedUser]);

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
                  <AssetAllocationTable data={assets} />
                </div>
              </Paper>
            </Grid>
            
            <Grid item xs={12} md={5} style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
              <Paper style={{ padding: '16px', flex: '1', display: 'flex', flexDirection: 'column' }}>
                <div style={{ flexGrow: 1, overflow: 'auto' }}>
                  {/* if user is true, show watchlist */}
                  {!selectedUser.ispm && <WatchlistTable/>}
                  {/* else transaction */}
                  {selectedUser.ispm && <TransactionTable/>}
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