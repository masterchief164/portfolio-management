import React, { useState } from 'react';
import {
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    TextField,
    Button,
    Box
} from '@mui/material';

export default function AddUserDialog({ open, onClose, onAddUser }) {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [age, setAge] = useState('');
    const [address, setAddress] = useState('');

    const handleAddUser = () => {
        if (firstName && lastName && age && address) {
            onAddUser({ firstName, lastName, age, address });
            setFirstName('');
            setLastName('');
            setAge('');
            setAddress('');
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
