import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    length: 0
};

const CartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        setCartLength(state, action) {
            // console.log('from payload',action.payload);
            state.length = action.payload;
            console.log(state.length );
        },
        decrement(state, action) {
            if (state.length > 0) {
                state.length  -= 1;
            }
            
        }
    }
});

export const { setCartLength ,decrement} = CartSlice.actions;
export default CartSlice.reducer;