import {useEffect, useState} from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TableSortLabel, Paper, TextField, Typography, Box } from '@mui/material';
import {useSelector} from "react-redux";
import {getUserWatchlist} from "../utils/httpClient.js";

// Helper function for sorting
const getComparator = (order, orderBy) => {
  return (a, b) => {
    if (orderBy === 'User_name' || orderBy === 'Asset_name') {
      // String comparison
      return (order === 'asc'
        ? a[orderBy].localeCompare(b[orderBy])
        : b[orderBy].localeCompare(a[orderBy]));
    }
    if (orderBy === 'Price_per_unit') {
      // Numeric comparison
      const aValue = parseFloat(a[orderBy].replace(/[^0-9.-]/g, '')) || 0;
      const bValue = parseFloat(b[orderBy].replace(/[^0-9.-]/g, '')) || 0;
      return (order === 'asc' ? aValue - bValue : bValue - aValue);
    }
    if (orderBy === 'Timestamp') {
      // Date comparison
      const aDate = new Date(a[orderBy]);
      const bDate = new Date(b[orderBy]);
      return (order === 'asc' ? aDate - bDate : bDate - aDate);
    }
    return 0; // Default case
  };
};

const WatchlistTable = () => {
  const [order, setOrder] = useState('asc');
  const [orderBy, setOrderBy] = useState('User_name');
  const [searchQuery, setSearchQuery] = useState('');
  const selectedUser = useSelector((store) => store.user.selectedUser);
  const [data, setData] = useState([]);

  useEffect(() => {
    if(!selectedUser.ispm){
      getUserWatchlist(selectedUser.id).then((watchlist) => {
        watchlist = watchlist.map((row) => {
          watchlist.User_name = row.fname + " " + row.lname;
            watchlist.Asset_name = row.name;
            watchlist.Price_per_unit = row.price_per_unit;
            watchlist.Timestamp = row.created_at;
            delete watchlist.fname;
            delete watchlist.lname;
            delete watchlist.name;
            delete watchlist.price_per_unit;
            delete watchlist.created_at;
            return watchlist;
        });
        setData(watchlist);
      });
    }
  }, [selectedUser]);


  const handleRequestSort = (property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  // Filter data based on search query
  const filteredData = data.filter(row =>
    row.User_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    row.Asset_name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div style={{ height: '100%' }}>
      <Box display="flex" alignItems="center" mb={2}>
        <Typography variant="h6" style={{ flexShrink: 0, marginRight: '16px' }}>
          Watchlist
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
                  active={orderBy === 'User_name'}
                  direction={orderBy === 'User_name' ? order : 'asc'}
                  onClick={() => handleRequestSort('User_name')}
                >
                  User Name
                </TableSortLabel>
              </TableCell>
              <TableCell>
                <TableSortLabel
                  active={orderBy === 'Asset_name'}
                  direction={orderBy === 'Asset_name' ? order : 'asc'}
                  onClick={() => handleRequestSort('Asset_name')}
                >
                  Asset Name
                </TableSortLabel>
              </TableCell>
              <TableCell align="right">
                <TableSortLabel
                  active={orderBy === 'Price_per_unit'}
                  direction={orderBy === 'Price_per_unit' ? order : 'asc'}
                  onClick={() => handleRequestSort('Price_per_unit')}
                >
                  Price per Unit
                </TableSortLabel>
              </TableCell>
              <TableCell align="right">
                <TableSortLabel
                  active={orderBy === 'Timestamp'}
                  direction={orderBy === 'Timestamp' ? order : 'asc'}
                  onClick={() => handleRequestSort('Timestamp')}
                >
                  Timestamp
                </TableSortLabel>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredData.sort(getComparator(order, orderBy)).map((row, index) => (
              <TableRow key={index} sx={{'&:hover': {
                backgroundColor: '#f5f5f5', 
              },}}>
                <TableCell>{row.User_name}</TableCell>
                <TableCell>{row.Asset_name}</TableCell>
                <TableCell align="right">{row.Price_per_unit}</TableCell>
                <TableCell align="right">{row.Timestamp}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default WatchlistTable;
