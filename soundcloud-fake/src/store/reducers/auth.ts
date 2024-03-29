import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { RootState } from "@/store";

interface IAuthState {
  token: string;
}

const initialState: IAuthState = {
  token: "",
};

const tokenSlice = createSlice({
  name: "token",
  initialState,
  reducers: {
    setToken: (state, action: PayloadAction<string>) => {
      state.token = action.payload;
    },
  },
});

export const { setToken } = tokenSlice.actions;
export const tokenSelector = (state: RootState) => state.token;
export default tokenSlice.reducer;
