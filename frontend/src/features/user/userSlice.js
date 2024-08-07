import { createSlice } from '@reduxjs/toolkit';
import randomColor from 'randomcolor';

const initialState = {
    selectedUser: { id: 1, firstName: 'Shaswat', lastName: 'Gupta' },
    users: [
        { id: 1, firstName: 'Shaswat', lastName: 'Gupta', age: 25, address: '123 Main St' },
        { id: 2, firstName: 'John', lastName: 'Doe', age: 30, address: '456 Elm St' },
        { id: 3, firstName: 'Jane', lastName: 'Doe', age: 28, address: '789 Maple St' }
    ],
    userColors: {
        1: randomColor(),
        2: randomColor(),
        3: randomColor()
    }
};

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setSelectedUser(state, action) {
            state.selectedUser = action.payload;
        },
        addUser(state, action) {
            const newUser = { ...action.payload, id: state.users.length + 1 };
            state.users.push(newUser);
            state.userColors[newUser.id] = randomColor();
        }
    }
});

export const { setSelectedUser, addUser } = userSlice.actions;
export default userSlice.reducer;
