import {useEffect, useState} from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TableSortLabel, Paper, TextField, Typography, Box,  TablePagination } from '@mui/material';
import {getPmTransactions} from "../utils/httpClient.js";
import {useSelector} from "react-redux";

const getComparator = (order, orderBy) => {
  return (a, b) => {
    if (orderBy === 'userName' || orderBy === 'assetName' || orderBy === 'assetSymbol') {
      return (order === 'asc' ? a[orderBy].localeCompare(b[orderBy]) : b[orderBy].localeCompare(a[orderBy]));
    }
   
    if (orderBy === 'timestamp') {
      return (order === 'asc' ? new Date(a[orderBy]) - new Date(b[orderBy]) : new Date(b[orderBy]) - new Date(a[orderBy]));
    }
    if(orderBy === 'quantity' || orderBy === 'pricePerUnit') {
        return (order === 'asc' ? a[orderBy] - b[orderBy] : b[orderBy] - a[orderBy]);
    }
    const aValue = parseFloat(a[orderBy].replace(/[^0-9.-]/g, ''));
    const bValue = parseFloat(b[orderBy].replace(/[^0-9.-]/g, ''));

    return (order === 'asc' ? aValue - bValue : bValue - aValue);
  };
};

const AssetAllocationTable = () => {
  const [order, setOrder] = useState('asc');
  const [orderBy, setOrderBy] = useState('userName');
  const [searchQuery, setSearchQuery] = useState('');
  const [page, setPage] = useState(0);
  const [data, setData] = useState([]);
  const selectedUser = useSelector((store) => store.user.selectedUser);
  const rowsPerPage = 10;

  const mapProperties = (transaction) => {
    transaction.userName = transaction.fname + " " +transaction.lname;
    transaction.assetSymbol = transaction.asset_symbol;
    transaction.assetName = transaction.name;
    transaction.timestamp = transaction.created_at;
    transaction.pricePerUnit = transaction.price_per_unit;
    delete transaction.asset_symbol;
    delete transaction.fname;
    delete transaction.lname;
    delete transaction.name;
    delete transaction.created_at;
    delete transaction.price;
    return transaction;
  };

  useEffect(() => {
    if(selectedUser.ispm) {
      getPmTransactions(selectedUser.id).then((transactions) => {
        transactions = transactions.map((transaction) => {
          return mapProperties(transaction);
        });
        setData(transactions);
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

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const filteredData = data.filter((row) =>
    Object.values(row).some((value) =>
      value.toString().toLowerCase().includes(searchQuery.toLowerCase())
    )
  );

  const paginatedData = filteredData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

  return (
    <div style={{ height: '100%' }}>
      <Box display="flex" alignItems="center" mb={2}>
        <Typography variant="h6" style={{ flexShrink: 0, marginRight: '16px' }}>
          Transaction History
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
                  active={orderBy === 'userName'}
                  direction={orderBy === 'userName' ? order : 'asc'}
                  onClick={() => handleRequestSort('userName')}
                >
                  User Name
                </TableSortLabel>
              </TableCell>
              <TableCell align="center">
                <TableSortLabel
                  active={orderBy === 'assetName'}
                  direction={orderBy === 'assetName' ? order : 'asc'}
                  onClick={() => handleRequestSort('assetName')}
                >
                  Asset Symbol
                </TableSortLabel>
              </TableCell>
              {/*<TableCell align="center">*/}
              {/*  <TableSortLabel*/}
              {/*    active={orderBy === 'timestamp'}*/}
              {/*    direction={orderBy === 'timestamp' ? order : 'asc'}*/}
              {/*    onClick={() => handleRequestSort('timestamp')}*/}
              {/*  >*/}
              {/*    Timestamp*/}
              {/*  </TableSortLabel>*/}
              {/*</TableCell>*/}
              <TableCell align="center">
                <TableSortLabel
                  active={orderBy === 'quantity'}
                  direction={orderBy === 'quantity' ? order : 'asc'}
                  onClick={() => handleRequestSort('quantity')}
                >
                  Quantity
                </TableSortLabel>
              </TableCell>
              <TableCell align="center">
                <TableSortLabel
                  active={orderBy === 'pricePerUnit'}
                  direction={orderBy === 'pricePerUnit' ? order : 'asc'}
                  onClick={() => handleRequestSort('pricePerUnit')}
                >
                  Price
                </TableSortLabel>
              </TableCell>
              <TableCell align="center">
                <TableSortLabel
                    active={orderBy === 'assetSymbol'}
                    direction={orderBy === 'assetSymbol' ? order : 'asc'}
                    onClick={() => handleRequestSort('assetSymbol')}
                >
                  Type
                </TableSortLabel>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedData.sort(getComparator(order, orderBy)).map((row, index) => (
              <TableRow key={index} sx={{'&:hover': {
                    backgroundColor: '#f5f5f5', 
                  },}}>
                <TableCell>{row.userName}</TableCell>
                <TableCell align="center">{row.assetSymbol}</TableCell>
                {/*<TableCell align="center">{new Date(row.timestamp).toLocaleString()}</TableCell>*/}
                <TableCell align="center">{row.quantity}</TableCell>
                <TableCell align="center">{row.price_per_unit}</TableCell>
                <TableCell align="center">{row.tx_type}</TableCell>
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

export default AssetAllocationTable;
