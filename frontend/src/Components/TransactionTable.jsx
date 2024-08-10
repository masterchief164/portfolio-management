import { useState } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TableSortLabel, Paper, TextField, Typography, Box,  TablePagination } from '@mui/material';
const getComparator = (order, orderBy) => {
  return (a, b) => {
    if (orderBy === 'userName' || orderBy === 'assetName' || orderBy === 'assetSymbol') {
      return (order === 'asc' ? a[orderBy].localeCompare(b[orderBy]) : b[orderBy].localeCompare(a[orderBy]));
    }
   
    if (orderBy === 'timestamp') {
      return (order === 'asc' ? new Date(a[orderBy]) - new Date(b[orderBy]) : new Date(b[orderBy]) - new Date(a[orderBy]));
    }
    const aValue = parseFloat(a[orderBy].replace(/[^0-9.-]/g, ''));
    const bValue = parseFloat(b[orderBy].replace(/[^0-9.-]/g, ''));

    return (order === 'asc' ? aValue - bValue : bValue - aValue);
  };
};

const AssetAllocationTable = ({ data }) => {
  const [order, setOrder] = useState('asc');
  const [orderBy, setOrderBy] = useState('userName');
  const [searchQuery, setSearchQuery] = useState('');
  const [page, setPage] = useState(0);
  const rowsPerPage = 4;

  const handleRequestSort = (property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  // const filteredData = data.filter(row =>
  //   row.userName.toLowerCase().includes(searchQuery.toLowerCase()) ||
  //   row.assetName.toLowerCase().includes(searchQuery.toLowerCase()) ||
  //   row.assetSymbol.toLowerCase().includes(searchQuery.toLowerCase())
  // );
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
              <TableCell>
                <TableSortLabel
                  active={orderBy === 'assetName'}
                  direction={orderBy === 'assetName' ? order : 'asc'}
                  onClick={() => handleRequestSort('assetName')}
                >
                  Asset Name
                </TableSortLabel>
              </TableCell>
              <TableCell>
                <TableSortLabel
                  active={orderBy === 'assetSymbol'}
                  direction={orderBy === 'assetSymbol' ? order : 'asc'}
                  onClick={() => handleRequestSort('assetSymbol')}
                >
                  Asset Symbol
                </TableSortLabel>
              </TableCell>
              <TableCell>
                <TableSortLabel
                  active={orderBy === 'timestamp'}
                  direction={orderBy === 'timestamp' ? order : 'asc'}
                  onClick={() => handleRequestSort('timestamp')}
                >
                  Timestamp
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
              <TableCell align="right">
                <TableSortLabel
                  active={orderBy === 'pricePerUnit'}
                  direction={orderBy === 'pricePerUnit' ? order : 'asc'}
                  onClick={() => handleRequestSort('pricePerUnit')}
                >
                  Price Per Unit
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
                <TableCell>{row.assetName}</TableCell>
                <TableCell>{row.assetSymbol}</TableCell>
                <TableCell>{new Date(row.timestamp).toLocaleString()}</TableCell>
                <TableCell align="right">{row.quantity}</TableCell>
                <TableCell align="right">{row.pricePerUnit}</TableCell>
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
