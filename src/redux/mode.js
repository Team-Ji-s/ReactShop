import { createSlice } from "@reduxjs/toolkit";


export const modeSlice = createSlice({
  name : "mode",
  initialState : {mode : "black"},
  reducers : {
    change : (state, action) => {
      state.mode = action.payload
    },
  },
})


export const {change} = modeSlice.actions

export default modeSlice.reducer