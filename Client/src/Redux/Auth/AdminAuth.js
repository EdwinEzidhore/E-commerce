import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isAdminLoggedIn:null
}

const AdminAuthslice = createSlice({
    name: 'adminauth',
    initialState,
    reducers: {
        setstatus(state, action) {
            state.isAdminLoggedIn = action.payload;
        }
    }
});

export const { setstatus} = AdminAuthslice.actions
export default AdminAuthslice.reducer;