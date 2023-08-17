import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { client } from "../../utils/client"
import { CreateClientFormInputs } from "./CreateClient"
import { normalizeCreateClientDat } from "./normalizer"

export const postCreateClient = createAsyncThunk(
  "clientOnboarding/createClient",
  async (data: CreateClientFormInputs) => {
    try {
      const normalizedData = normalizeCreateClientDat(data)
      const response = await client("/organization/onboard-organization", {
        body: normalizedData,
      })

      return response.data
    } catch (error) {
      throw error
    }
  },
)

export const getClientList = createAsyncThunk(
  "clientOnboarding/getClientList",
  async () => {
    try {
      const response = await client("/organization/get-organizations", {
        body: {
          filters: {},
          page: 1,
          query: "",
          results_per_page: 10,
          sort_by: "",
        },
      })
      return response.data
    } catch (error) {}
  },
)

const clientOnboardingSlice = createSlice({
  name: "clientOnboarding",
  initialState: {
    clientData: {},
    clientList: [],
  },
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(postCreateClient.pending, () => {})
      .addCase(postCreateClient.fulfilled, (state, action) => {
        state.clientData = action.payload
      })
      .addCase(postCreateClient.rejected, () => {})
      .addCase(getClientList.pending, () => {})
      .addCase(getClientList.fulfilled, (state, action) => {
        state.clientList = action.payload
      })
      .addCase(getClientList.rejected, () => {})
  },
})

export default clientOnboardingSlice.reducer
