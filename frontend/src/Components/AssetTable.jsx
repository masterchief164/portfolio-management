import {useEffect, useState} from 'react';
import {
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
  TableSortLabel, Paper, TextField, Typography, Box, Button, TablePagination
} from '@mui/material';
import {getAssets, getPmAssets, getUserAssets} from "../utils/httpClient.js";
import {useSelector} from "react-redux";

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
  const rowsPerPage = 10;
  const selectedUser = useSelector((store) => store.user.selectedUser);


  useEffect( () => {
    getAssets().then((assets) => {
      if(selectedUser.ispm) {
        getPmAssets(selectedUser.id).then((pmAssets) => {
          let userAssetIndex = 0;
          for (let i = 0; i < assets.length; i++) {
            if (userAssetIndex < pmAssets.length && assets[i].symbol === pmAssets[userAssetIndex].asset_symbol) {
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
          let userAssetIndex = 0;
          for (let i = 0; i < assets.length; i++) {
            if (userAssetIndex < userAssets.length && assets[i].symbol === userAssets[userAssetIndex].asset_symbol) {
              assets[i].quantity = userAssets[userAssetIndex].quantity;
              userAssetIndex++;
            } else {
              assets[i].quantity = 0;
            }
          }
          setData(assets);
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

  const handleTransaction = (asset, type) => {
    if (type === 'buy') {
      // Handle buy logic here
      console.log(`Buying ${asset.name}`);
    } else {
      // Handle sell logic here
      console.log(`Selling ${asset.name}`);
    }
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
                    onClick={() => handleTransaction(row, 'buy')}
                    style={{ marginRight: '8px' }}
                  >
                    Buy
                  </Button>
                  <Button
                    variant="contained"
                    color="secondary"
                    onClick={() => handleTransaction(row, 'sell')}
                    disabled={row.quantity <= 0}
                    style={{
                      opacity: row.quantity <= 0 ? 0.5 : 1,
                      transition: 'opacity 0.3s ease'
                    }}
                  >
                    Sell
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
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
