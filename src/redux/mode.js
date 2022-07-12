import { createSlice } from "@reduxjs/toolkit";


export const modeSlice = createSlice({
  name : "mode",
  initialState : {color : "black"},
  reducers : {
    change : (state, action) => {
      state.color = action.payload
    },
  },
})


export const {change} = modeSlice.actions

export default modeSlice.reducer