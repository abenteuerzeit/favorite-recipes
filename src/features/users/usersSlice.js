import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const fetchUserById = createAsyncThunk(
    'users/fetchUserById',
    async (userId) => {
      const users = await fetch(`api/users${userId}`)
      const data = await users.json()
      return data
    }
  )
  
export const usersSlice = createSlice({
    name: 'users',
    initialState: { 
        users:  [], 
        isLoading: false, 
        hasError: false 
    },
    reducers: {
        addUser: (state, action) => { 
        state.users.push(action.payload) 
        }        
    },
    extraReducers: {
        [fetchUserById.pending]: (state, action) => {
        state.isLoading = true;
        state.hasError = false;
        },
        [fetchUserById.fulfilled]: (state, action) => {
        state.users.push(action.payload);
        state.isLoading = false;
        state.hasError = false;
        },
        [fetchUserById.rejected]: (state, action) => {
        state.isLoading = false;
        state.hasError = true;
        }
    }
})