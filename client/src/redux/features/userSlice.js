import { createSlice } from "@reduxjs/toolkit";

export const userSlice= createSlice({
    name:'user',
    initialState:{
        user:null
    },
    reducers:{
        userAll:(state,action) => {
            state.user = action.payload
        }
    }
});

export const { userAll } = userSlice.actions