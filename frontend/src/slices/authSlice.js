import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    userInfo: localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')) : null
}

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers:{
        setCredentials: (state, action) => {
            state.userInfo = action.payload;
            localStorage.setItem('userInfo', JSON.stringify(state.userInfo));
        },
        logOut: (state, action ) => {
            state.userInfo = null;
            localStorage.clear();
        }
    }
})

export const { setCredentials, logOut } = authSlice.actions;
export default authSlice.reducer;