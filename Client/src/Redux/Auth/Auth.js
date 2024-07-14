import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    auth: {
        username: null,
        user:null,
    },
   
};

const AuthSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setRecoveryMail(state, action) {    
            state.auth.username = action.payload  
        },
        setUser(state, action) {
          
            state.auth.user = action.payload;
    
            if (!state.auth.username || state.auth.username !== action.payload.email) {
                state.auth.username = action.payload.email;
            }
        },
        logOutUser(state, action) {
            state.auth.username = null;
            state.auth.user = null;
            
        }
    }
});

export const { setRecoveryMail,setUser,logOutUser} = AuthSlice.actions;
export default AuthSlice.reducer;