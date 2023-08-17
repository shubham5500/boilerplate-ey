import { createAsyncThunk } from "@reduxjs/toolkit"
import { CreateClientFormInputs } from "./CreateClient"
import { normalizeCreateClientData } from "./normalizer"
import { client } from "../../utils/client"

export const postCreateClient = createAsyncThunk(
    "clientOnboarding/createClient",
    async (data: CreateClientFormInputs) => {
      try {
        const normalizedData = normalizeCreateClientData(data)
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