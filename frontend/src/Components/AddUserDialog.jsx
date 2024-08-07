// /src/components/AddUserDialog.jsx
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Button,
} from '@mui/material';
import { setSelectedUser } from '../features/user/userSlice';
import randomColor from 'randomcolor';

export default function AddUserDialog({ open, onClose }) {
  const dispatch = useDispatch();
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [age, setAge] = useState('');
  const [address, setAddress] = useState('');

  const handleAddUser = () => {
    if (firstName && lastName && age && address) {
      const newUser = {
        id: Math.random().toString(36).substr(2, 9), // Generate a random id
        firstName,
        lastName,
        age,
        address,
        color: randomColor(),
      };
      dispatch(setSelectedUser(newUser));
      setFirstName('');
      setLastName('');
      setAge('');
      setAddress('');
      onClose();
    }
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      handleAddUser();
    }
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Add New User</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          label="First Name"
          type="text"
          fullWidth
          variant="standard"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <TextField
          margin="dense"
          label="Last Name"
          type="text"
          fullWidth
          variant="standard"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <TextField
          margin="dense"
          label="Age"
          type="number"
          fullWidth
          variant="standard"
          value={age}
          onChange={(e) => setAge(e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <TextField
          margin="dense"
          label="Address"
          type="text"
          fullWidth
          variant="standard"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          onKeyDown={handleKeyDown}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Cancel
        </Button>
        <Button
          onClick={handleAddUser}
          color="primary"
          variant="contained"
          sx={{ margin: 1 }}
        >
          Add
        </Button>
      </DialogActions>
    </Dialog>
  );
}
