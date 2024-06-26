import { createSlice } from '@reduxjs/toolkit';

const initialState = null;

const SingleProductSlice = createSlice({
    name: 'singleProduct',
    initialState,
    reducers: {
        add(state, action) {
            return action.payload;
        }
    }
});

export const { add } = SingleProductSlice.actions;
export default SingleProductSlice.reducer;