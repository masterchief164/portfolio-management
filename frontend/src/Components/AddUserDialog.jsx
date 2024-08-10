import { useState } from 'react';
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Button,
} from '@mui/material';
import randomColor from 'randomcolor';
import { add_user, get_users } from '../utils/user_utils';
import { useDispatch } from 'react-redux';
import { updateUsers } from '../features/user/userSlice';

export default function AddUserDialog({ open, onClose }) {
  // const dispatch = useDispatch();
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [age, setAge] = useState('');
  const [address, setAddress] = useState('');
  
  const handleAddUser = async() => {
    if (firstName && lastName && age && address) {
      const newUser = {
        id: Math.random().toString(36).substr(2, 9), // Generate a random id
        firstName,
        lastName,
        age,
        address,
        color: randomColor(),
      };
      // console.log("Adding user");
      await add_user(newUser);
      const users = await get_users();
      dispatch(updateUsers(users));
      // console.log("");
      // dispatch(setSelectedUser(newUser));
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