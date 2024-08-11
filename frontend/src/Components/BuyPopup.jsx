import { useState, useEffect } from 'react';
import {
  Dialog, DialogActions, DialogContent, DialogTitle, TextField, Button, Typography, Box, IconButton
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { useDispatch, useSelector } from "react-redux";
import { addTxn } from '../utils/httpClient';
import { companies } from '../utils/AssetData';
import { setSelectedUser } from '../features/user/userSlice';

const BuyPopup = ({ asset, open, onClose }) => {
  const [quantity, setQuantity] = useState('');
  const [price, setPrice] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);
  const selectedUser = useSelector((store) => store.user.selectedUser);

  useEffect(() => {
    // const cleanPrice = asset.price.replace(/[^0-9.-]/g, ''); 
    const parsedPrice = parseFloat(asset.price);
    if (quantity !== '' && !isNaN(quantity)) {
      const parsedQuantity = parseFloat(quantity);
      if (parsedQuantity > 0 && !isNaN(parsedPrice) && parsedPrice > 0) {
        setPrice(parsedPrice);
        setTotalPrice(quantity*parsedPrice);
      } else {
        setPrice(0);
        setTotalPrice(0);
      }
    } else {
      setPrice(0);
      setTotalPrice(0);
    }
  }, [quantity, asset.price]);

  const handleQuantityChange = (e) => {
    const value = e.target.value;
    if (value === '' || (Number(value) >= 0)) {
      setQuantity(value);
    }
  };

  const handleIncrement = () => {
    setQuantity(prev => (Number(prev) + 1).toString());
  };

  const handleDecrement = () => {
    setQuantity(prev => (Number(prev) > 1 ? (Number(prev) - 1).toString() : '1'));
  };

  const dispatch = useDispatch();
  const handleBuy = async () => {
    if (quantity > 0) {
      const asset_symbol = companies.find((c) => c.name.toLowerCase() === asset.name.toLowerCase())?.symbol;
      addTxn(2, selectedUser.id, asset_symbol, parseFloat(quantity), price, "buy");
      const newUser = JSON.parse(JSON.stringify(selectedUser));
      dispatch(setSelectedUser(newUser));       
      onClose();
      
    } else {
      console.log('Please enter a valid quantity');
    }
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle sx={{ fontWeight: 'bold', fontSize: '1.75rem', bgcolor: 'background.paper' }}>
        Buy 
      </DialogTitle>
      <DialogContent sx={{ padding: '2rem' }}>
        <Box display="flex" flexDirection="column" gap={2}>
          <Box display="flex" flexDirection="column" mb={2}>
            <Typography variant="body1" sx={{ fontSize: '1.25rem', fontWeight: 'bold' }}>
              <strong>Stock Name:</strong> {asset.name}
            </Typography>
            <Typography variant="body1" sx={{ fontSize: '1.25rem', fontWeight: 'bold' }}>
              <strong>Price:</strong> ${asset.price}
            </Typography>
          </Box>
          <Box display="flex" alignItems="center" border={1} borderColor="divider" borderRadius={1} p={2} bgcolor="background.default" boxShadow={3}>
            <IconButton onClick={handleDecrement} aria-label="decrement" size="large">
              <RemoveIcon />
            </IconButton>
            <TextField
              label="Quantity"
              type="number"
              variant="outlined"
              value={quantity}
              onChange={handleQuantityChange}
              inputProps={{ min: 1 }} 
              sx={{ 
                textAlign: 'center', 
                width: '120px', 
                mx: 2,
                '& input::-webkit-inner-spin-button, & input::-webkit-outer-spin-button': {
                  WebkitAppearance: 'none',
                  margin: 0,
                },
                '& input[type=number]': {
                  MozAppearance: 'textfield',
                }
              }}
            />
            <IconButton onClick={handleIncrement} aria-label="increment" size="large">
              <AddIcon />
            </IconButton>
          </Box>
          <Typography variant="h5" color="primary" sx={{ mt: 2, fontWeight: 'bold' }}>
            Total Price: ${totalPrice.toFixed(2)}
          </Typography>
        </Box>
      </DialogContent>
      <DialogActions sx={{ padding: '1rem', bgcolor: 'background.paper' }}>
        <Button onClick={onClose} color="secondary" variant="outlined">
          Cancel
        </Button>
        <Button onClick={handleBuy} color="primary" variant="contained">
          Buy
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default BuyPopup;