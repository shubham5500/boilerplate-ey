import { createSlice } from "@reduxjs/toolkit";
import { ClientData, ClientDataList } from "../../interfaces/clientInterface";
import { getClientList } from "./asyncThunks";


const initialState = {
  clientData: {} as ClientData,
  clientList: {} as ClientDataList,
}

const clientOnboardingSlice = createSlice({
  name: "clientOnboarding",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(getClientList.pending, () => {})
      .addCase(getClientList.fulfilled, (state, action) => {
        state.clientList = action.payload;
      })
      .addCase(getClientList.rejected, () => {})
  },
});


export default clientOnboardingSlice.reducer
