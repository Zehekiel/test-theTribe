import { Characters } from '../class/character'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export const opponentSlice = createSlice({
  name: 'characterList',
  initialState: {
    value: new Characters()
  },
  reducers: {
    saveOpponent: (state, action: PayloadAction<Characters>) => {
      state.value = action.payload
    },
    deleteOpponent: (state) => {
      state.value = new Characters()
    },
  },
})

// Action creators are generated for each case reducer function
export const { saveOpponent, deleteOpponent } = opponentSlice.actions

export default opponentSlice.reducer
