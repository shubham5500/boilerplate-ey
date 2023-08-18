import { createSlice } from "@reduxjs/toolkit";
import { ClientData, ClientDataList } from "../../interfaces/clientInterface";
import { getClientList } from "./asyncThunks";
import { sliceName } from "./consts";
import { RootState } from "../../app/store";


const initialState = {
  clientData: {} as ClientData,
  clientList: {} as ClientDataList,
}

const clientOnboardingSlice = createSlice({
  name: sliceName,
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

export const clientListSelector = (state: RootState) => state.clientOnboarding.clientList;


export default clientOnboardingSlice.reducer
