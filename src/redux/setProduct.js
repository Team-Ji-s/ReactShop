import axios from "axios"
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"

export const getList = createAsyncThunk("GET_PRODUCTS", async () => {
  try {
    const response = await axios.get("https://fakestoreapi.com/products")
    return response.data
  } catch (error) {
    return console.log(error)
  }
})

export const setProductSlice = createSlice({
  name: "setProduct",
  initialState: { products : [] },
  reducers: {},
  extraReducers: {
    [getList.fulfilled]: (state, action) => {
      state.products = action.payload
    }
  }
})

export default setProductSlice.reducer
