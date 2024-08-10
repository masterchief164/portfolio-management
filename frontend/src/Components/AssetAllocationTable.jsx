import {useEffect, useState} from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TableSortLabel,
  Paper,
  TextField,
  Typography,
  Box,
  TablePagination } from '@mui/material';

// Helper function for sorting
const getComparator = (order, orderBy) => {
  return (a, b) => {
    // Handling string columns (name and symbol)
    if (orderBy === 'name' || orderBy === 'asset_symbol') {
      return (order === 'asc'
        ? a[orderBy].localeCompare(b[orderBy])
        : b[orderBy].localeCompare(a[orderBy]));
    }

    // Handling numeric columns
    const aValue = typeof a[orderBy] === 'string' ? parseFloat(a[orderBy].replace(/[^0-9.-]/g, '')) || 0 : a[orderBy];
    const bValue = typeof b[orderBy] === 'string' ? parseFloat(b[orderBy].replace(/[^0-9.-]/g, '')) || 0 : b[orderBy];

    return (order === 'asc' ? aValue - bValue : bValue - aValue);
  };
};

const AssetAllocationTable = ({ data }) => {
  const [order, setOrder] = useState('asc');
  const [orderBy, setOrderBy] = useState('name');
  const [searchQuery, setSearchQuery] = useState('');
  const [page, setPage] = useState(0);
  const rowsPerPage = 10;
  const [total, setTotal] = useState(0);

  useEffect(() => {
    let total= 0;
    data.forEach((row) => {
      total += row.value;
    });
    setTotal(total);
  }, [data]);

  const handleRequestSort = (property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  // Filter data based on search query
  // const filteredData = data.filter(row =>
  //   row.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
  //   row.symbol.toLowerCase().includes(searchQuery.toLowerCase())
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
          Asset Allocation
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
              <TableCell align="right">
                <TableSortLabel
                  active={orderBy === 'totalValueHeld'}
                  direction={orderBy === 'totalValueHeld' ? order : 'asc'}
                  onClick={() => handleRequestSort('totalValueHeld')}
                >
                  Total Value Held
                </TableSortLabel>
              </TableCell>
              <TableCell align="right">
                <TableSortLabel
                  active={orderBy === 'percentageOfAllocation'}
                  direction={orderBy === 'percentageOfAllocation' ? order : 'asc'}
                  onClick={() => handleRequestSort('percentageOfAllocation')}
                >
                  Percentage of Allocation
                </TableSortLabel>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedData.sort(getComparator(order, orderBy)).map((row, index) => (
              <TableRow key={index} sx={{'&:hover': {
                backgroundColor: '#f5f5f5', 
              },}}>
                <TableCell>{row.name}</TableCell>
                <TableCell>{row.asset_symbol}</TableCell>
                <TableCell align="right">$ {row.price}</TableCell>
                <TableCell align="right">{row.quantity}</TableCell>
                <TableCell align="right">$ {row.value}</TableCell>
                <TableCell align="right">{((row.value / total) * 100).toFixed(2) + '%'}</TableCell>
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
