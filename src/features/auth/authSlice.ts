import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { client } from "../../utils/client.js"
import { Inputs } from "./Login.js"
import { LocalStorageService } from "../../utils/localStorageService.js"

export const BASE_URL = "http://localhost:5000"

const initialState = {
  loading: false,
  error: '',
  authData: {},
}

export const postLogin = createAsyncThunk("auth/postLogin", async (loginData: Inputs) => {
  try {
    const response = await client("/auth/login", {
      body: loginData,
    })
    return response.data
  } catch (error) {
    throw error;
  }
})

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(postLogin.pending, (state) => {
        state.loading = true
      })
      .addCase(postLogin.fulfilled, (state, action) => {
        state.authData = action.payload;
        state.error = '';
      })
      .addCase(postLogin.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || '';
      })
  },
})

export default authSlice.reducer
