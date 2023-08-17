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

const clientOnboardingSlice = createSlice({
  name: "clientOnboarding",
  initialState: {
    clientData: {},
  },
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(postCreateClient.pending, () => {})
      .addCase(postCreateClient.fulfilled, (state, action) => {
        state.clientData = action.payload;
      })
      .addCase(postCreateClient.rejected, () => {})
  },
})

export default clientOnboardingSlice.reducer
