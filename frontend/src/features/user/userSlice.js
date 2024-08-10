// /src/features/user/userSlice.js
import { createSlice } from "@reduxjs/toolkit";
import randomColor from "randomcolor";

const initialState = {
    selectedUser: {
        id: 2,
        firstName: "Shaswat",
        lastName: "Gupta",
        color: randomColor(),
        ispm: true,
    },
};

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        setSelectedUser(state, action) {
            state.selectedUser = action.payload;
        },
    },
});

export const { setSelectedUser } = userSlice.actions;
export default userSlice.reducer;
