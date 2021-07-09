import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export const tokenSlice = createSlice({
  name: 'token',
  initialState: {
    value: ''
  },
  reducers: {
    saveToken: (state, action: PayloadAction<string>) => {
      state.value = action.payload
    },
    deleteToken: state => {
      state.value = ''
    }
  }
})

// Action creators are generated for each case reducer function
export const { saveToken, deleteToken } = tokenSlice.actions

export default tokenSlice.reducer
