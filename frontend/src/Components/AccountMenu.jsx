import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  Box,
  Avatar,
  Menu,
  MenuItem,
  ListItemIcon,
  Divider,
  IconButton,
  Typography,
  Tooltip,
} from "@mui/material";
import PersonAdd from "@mui/icons-material/PersonAdd";
import Logout from "@mui/icons-material/Logout";
import AddUserDialog from "./AddUserDialog";
import { setSelectedUser, addUser } from "../features/user/userSlice";

export default function AccountMenu() {
  const dispatch = useDispatch();
  const { users, selectedUser, userColors } = useSelector(
    (state) => state.user
  );
  const [anchorEl, setAnchorEl] = useState(null);
  const [loggedIn, setLoggedIn] = useState(true);
  const [isAddUserDialogOpen, setAddUserDialogOpen] = useState(false);

  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleLogout = () => {
    setLoggedIn(false);
    handleClose();
  };
  const selectUser = (user) => {
    dispatch(setSelectedUser(user));
    handleClose();
  };
  const handleAddUser = (newUser) => {
    dispatch(addUser(newUser));
    setAddUserDialogOpen(false);
  };
  const openAddUserDialog = () => {
    setAddUserDialogOpen(true);
    handleClose();
  };
  const closeAddUserDialog = () => {
    setAddUserDialogOpen(false);
  };

  return (
    <React.Fragment>
      <Box sx={{ display: "flex", alignItems: "center", textAlign: "center" }}>
        <Typography
          sx={{ mr: 2 }}
        >{`${selectedUser.firstName} ${selectedUser.lastName}`}</Typography>
        <Tooltip title="Accounts">
          <IconButton
            onClick={handleClick}
            size="small"
            sx={{
              ml: 2,
              color: userColors[selectedUser.id] || "defaultColor",
              "&:hover": {
                color: userColors[selectedUser.id] || "defaultColor",
              },
            }}
            aria-controls={open ? "account-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
          >
            <Avatar
              sx={{
                width: 32,
                height: 32,
                bgcolor: userColors[selectedUser.id] || "defaultColor",
              }}
            >
              {selectedUser.firstName[0]}
            </Avatar>
          </IconButton>
        </Tooltip>
      </Box>
      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: "visible",
            filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
            mt: 1.5,
            "& .MuiAvatar-root": {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            "&::before": {
              content: '""',
              display: "block",
              position: "absolute",
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: "background.paper",
              transform: "translateY(-50%) rotate(45deg)",
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      >
        {users.map((user) => (
          <MenuItem key={user.id} onClick={() => selectUser(user)}>
            <Avatar sx={{ bgcolor: userColors[user.id] || "defaultColor" }}>
              {user.firstName[0]}
            </Avatar>
            {`${user.firstName} ${user.lastName}`}
          </MenuItem>
        ))}
        <Divider />
        <MenuItem onClick={openAddUserDialog}>
          <ListItemIcon>
            <PersonAdd fontSize="small" />
          </ListItemIcon>
          Add another account
        </MenuItem>
        {loggedIn && (
          <MenuItem onClick={handleLogout}>
            <ListItemIcon>
              <Logout fontSize="small" />
            </ListItemIcon>
            Logout
          </MenuItem>
        )}
      </Menu>
      <AddUserDialog
        open={isAddUserDialogOpen}
        onClose={closeAddUserDialog}
        onAddUser={handleAddUser}
      />
    </React.Fragment>
  );
}
