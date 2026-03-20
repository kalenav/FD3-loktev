import { createSlice } from "@reduxjs/toolkit";
import { IUser } from "../user.interface";

const userSlice = createSlice({
  name: "users",
  initialState: {
    list: [] as IUser[],
    error: null as string | null,
    isLoading: false,
  },
  reducers: {
    setUsers(state, action: { payload: IUser[] }) {
      state.list = action.payload.slice();
    },
    setError(state, action: { payload: string | null }) {
      state.error = action.payload;
    },
    setIsLoading(state, action: { payload: boolean }) {
      state.isLoading = action.payload;
    }
  }
});

export const { setUsers, setError, setIsLoading } = userSlice.actions;

export default userSlice.reducer;