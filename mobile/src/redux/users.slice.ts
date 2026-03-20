import { createSlice } from "@reduxjs/toolkit";
import { IUser } from "../user.interface";
import { fetchUsers } from "./fetch-users";

const userSlice = createSlice({
  name: "users",
  initialState: {
    list: [] as IUser[],
    error: null as string | null,
    isLoading: false,
  },
  reducers: {
    addUser(state, action: { payload: IUser }) {
      state.list.push(action.payload);
    },
    updateUser(state, action: { payload: IUser }) {
      state.list = state.list.map(user => user.id === action.payload.id ? action.payload : user);
    },
    deleteUser(state, action: { payload: number }) {
      state.list = state.list.filter(user => user.id !== action.payload);
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.isLoading = false;
        state.list = action.payload;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message ?? 'chto-to poshlo ne tak...';
      });
  }
});

export const { addUser, updateUser, deleteUser } = userSlice.actions;

export default userSlice.reducer;