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
           
        },
        decrement(state, action) {
            if (state.length > 0) {
                state.length  -= 1;
            }
            
        },
        cartlogout(state, action) {
            state.length = 0;
        }
    }
});

export const { setCartLength ,decrement,cartlogout} = CartSlice.actions;
export default CartSlice.reducer;