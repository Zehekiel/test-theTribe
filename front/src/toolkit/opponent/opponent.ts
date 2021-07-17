import { Characters } from '../../class/character'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'

const Character = new Characters()
const basicOpponent =  { ...Character }

export const opponentSlice = createSlice({
  name: 'characterList',
  initialState: {
    value: basicOpponent
  },
  reducers: {
    saveOpponent: (state, action: PayloadAction<Characters>) => {
      state.value = { ...action.payload, ['selected']: false }
    },
    deleteOpponent: (state) => {
      state.value = basicOpponent
    },
  },
})

// Action creators are generated for each case reducer function
export const { saveOpponent, deleteOpponent } = opponentSlice.actions

export default opponentSlice.reducer
