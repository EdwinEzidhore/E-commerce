import { createSlice } from "@reduxjs/toolkit";

const initialState =  {
        addresses: [],
        activeAddress: null,
    }


const AddressSlice = createSlice({
    name: 'address',
    initialState,
    reducers: {
      setAddresses(state, action) {
       
            state.addresses = action.payload;
            if (state.addresses.length > 1) {
              state.activeAddress = state.addresses[0];
            }
          },
        addAddress(state, action) {
            state.addresses.push(action.payload);
            if (state.addresses.length === 1) {
              state.activeAddress = action.payload;
            }

        },
        set_active_address(state, action) {
            state.activeAddress = action.payload;
        },
        removeAddress(state, action) {
            state.addresses = state.addresses.filter(address => address._id !== action.payload);
            if (state.activeAddress && state.activeAddress._id === action.payload) {
                state.activeAddress = state.addresses[0] || null;
              }
      },
      logout(state, action) {
        state.addresses = [];
        state.activeAddress = null;
      }
 
    }
});

export const { addAddress,set_active_address,setAddresses ,removeAddress,logout} = AddressSlice.actions;
export default AddressSlice.reducer;
