import {useEffect, useState} from 'react';
import {
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
  TableSortLabel, Paper, TextField, Typography, Box, Button, TablePagination, IconButton
} from '@mui/material';
import {
  addToWatchlist,
  getAssets,
  getPmAssets,
  getUserAssets,
  getUserWatchlist,
  removeFromWatchlist
} from "../utils/httpClient.js";
import {useSelector} from "react-redux";
import BuyPopup from './BuyPopup.jsx';
import SellPopup from './SellPopup.jsx';
import {Star, StarBorder} from "@mui/icons-material";

// Helper function for sorting
const getComparator = (order, orderBy) => {
  return (a, b) => {
    if (orderBy === 'name' || orderBy === 'symbol') {
      return (order === 'asc'
        ? a[orderBy].localeCompare(b[orderBy])
        : b[orderBy].localeCompare(a[orderBy]));
    }

    const aValue = typeof a[orderBy] === 'string' ? parseFloat(a[orderBy].replace(/[^0-9.-]/g, '')) || 0 : a[orderBy];
    const bValue = typeof b[orderBy] === 'string' ? parseFloat(b[orderBy].replace(/[^0-9.-]/g, '')) || 0 : b[orderBy];

    return (order === 'asc' ? aValue - bValue : bValue - aValue);
  };
};

const AssetTable = () => {
  const [order, setOrder] = useState('asc');
  const [orderBy, setOrderBy] = useState('name');
  const [searchQuery, setSearchQuery] = useState('');
  const [page, setPage] = useState(0);
  const [data, setData] = useState([]);
  const [selectedAsset, setSelectedAsset] = useState(null);
  const [isBuyPopupOpen, setBuyPopupOpen] = useState(false);
  const [isSellPopupOpen, setSellPopupOpen] = useState(false);
  const rowsPerPage = 10;
  const selectedUser = useSelector((store) => store.user.selectedUser);


  useEffect( () => {
    getAssets().then((assets) => {
      if(selectedUser.ispm) {
        getPmAssets(selectedUser.id).then((pmAssets) => {
          let userAssetIndex = 0;
          for (let i = 0; i < assets.length; i++) {
            if (userAssetIndex < pmAssets.length && assets[i].symbol === pmAssets[userAssetIndex].symbol) {
              assets[i].quantity = pmAssets[userAssetIndex].quantity;
              userAssetIndex++;
            } else {
              assets[i].quantity = 0;
            }
          }
          setData(assets);
        });
      } else {
        getUserAssets(selectedUser.id).then((userAssets) => {
          getUserWatchlist(selectedUser.id).then((watchlist) => {

            let userAssetIndex = 0;
            let watchlistIndex = 0;
            for (let i = 0; i < assets.length; i++) {
              if (userAssetIndex < userAssets.length && assets[i].symbol === userAssets[userAssetIndex].symbol) {
                assets[i].quantity = userAssets[userAssetIndex].quantity;
                userAssetIndex++;
              } else {
                assets[i].quantity = 0;
              }
            }
            for (let i = 0; i < assets.length; i++) {

                if (watchlistIndex < watchlist.length && assets[i].symbol === watchlist[watchlistIndex].asset_symbol) {
                    assets[i].watchlist = true;
                    watchlistIndex++;
                } else {
                  assets[i].watchlist = false;
                }
            }
            setData(assets);
        });

        });
      }
    });
  }, [selectedUser]);

  const handleRequestSort = (property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleWatchlist = async (asset) => {
    if(asset.watchlist) {
        const resp =  await removeFromWatchlist(selectedUser.id, asset.symbol);
        if(resp.data === 'success') {
          const newData = [...data];
          const index = newData.findIndex((a) => a.symbol === asset.symbol);
          newData[index].watchlist = false;
          setData(newData);
        }
    } else {
        const resp =  await addToWatchlist(selectedUser.id, asset.symbol, asset.price);
        if(resp.data === 'success') {
          const newData = [...data];
          const index = newData.findIndex((a) => a.symbol === asset.symbol);
          newData[index].watchlist = true;
          setData(newData);
        }
    }
  };

  // const handleTransaction = (asset, type) => {
  //   if (type === 'buy') {
  //     // Handle buy logic here
  //     console.log(`Buying ${asset.name}`);
  //   } else {
  //     // Handle sell logic here
  //     console.log(`Selling ${asset.name}`);
  //   }
  // };

  const handleOpenBuyPopup = (asset) => {
    setSelectedAsset(asset);
    setBuyPopupOpen(true);
  };

  const handleOpenSellPopup = (asset) => {
    setSelectedAsset(asset);
    setSellPopupOpen(true);
  };

  const handleClosePopups = () => {
    setBuyPopupOpen(false);
    setSellPopupOpen(false);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const filteredData = data.filter(row =>
    row.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    row.symbol.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const paginatedData = filteredData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);


  return (
    <div style={{ height: '100%' }}>
      <Box display="flex" alignItems="center" mb={2}>
        <Typography variant="h6" style={{ flexShrink: 0, marginRight: '16px' }}>
          Asset Table
        </Typography>
        <TextField
          label="Search"
          variant="outlined"
          fullWidth
          value={searchQuery}
          onChange={handleSearchChange}
        />
      </Box>
      <TableContainer component={Paper} style={{ maxHeight: '100%' }}>
        <Table stickyHeader>
          <TableHead>
            <TableRow>
              <TableCell>
                <TableSortLabel
                  active={orderBy === 'name'}
                  direction={orderBy === 'name' ? order : 'asc'}
                  onClick={() => handleRequestSort('name')}
                >
                  Name
                </TableSortLabel>
              </TableCell>
              <TableCell>
                <TableSortLabel
                  active={orderBy === 'symbol'}
                  direction={orderBy === 'symbol' ? order : 'asc'}
                  onClick={() => handleRequestSort('symbol')}
                >
                  Symbol
                </TableSortLabel>
              </TableCell>
              <TableCell align="right">
                <TableSortLabel
                  active={orderBy === 'price'}
                  direction={orderBy === 'price' ? order : 'asc'}
                  onClick={() => handleRequestSort('price')}
                >
                  Price
                </TableSortLabel>
              </TableCell>
              <TableCell align="right">
                <TableSortLabel
                  active={orderBy === 'quantity'}
                  direction={orderBy === 'quantity' ? order : 'asc'}
                  onClick={() => handleRequestSort('quantity')}
                >
                  Quantity
                </TableSortLabel>
              </TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedData.sort(getComparator(order, orderBy)).map((row, index) => (
              <TableRow key={index}>
                <TableCell>{row.name}</TableCell>
                <TableCell>{row.symbol}</TableCell>
                <TableCell align="right">$ {row.price}</TableCell>
                <TableCell align="right">{row.quantity}</TableCell>
                <TableCell align="right">
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => handleOpenBuyPopup(row)}
                    style={{ marginRight: '8px' }}
                  >
                    Buy
                  </Button>
                  <Button
                    variant="contained"
                    color="secondary"
                    onClick={() => handleOpenSellPopup(row)}
                    disabled={row.quantity <= 0}
                    style={{
                      opacity: row.quantity <= 0 ? 0.5 : 1,
                      transition: 'opacity 0.3s ease'
                    }}
                  >
                    Sell
                  </Button>

                  {!selectedUser.ispm &&<IconButton onClick={()=> handleWatchlist(row)}>
                    {row.watchlist ? <Star/> : <StarBorder/>}
                  </IconButton>}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      {selectedAsset && (
        <>
          <BuyPopup asset={selectedAsset} open={isBuyPopupOpen} onClose={handleClosePopups} />
          <SellPopup asset={selectedAsset} open={isSellPopupOpen} onClose={handleClosePopups} />
        </>
      )}
      <TablePagination
          rowsPerPageOptions={[]}
          component="div"
          count={filteredData.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
      />
    </div>
  );
};

export default AssetTable;
