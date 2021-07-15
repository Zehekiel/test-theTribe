import { Characters } from '../class/character'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export const myCharacterListSlice = createSlice({
  name: 'characterList',
  initialState: {
    value: new Characters()
  },
  reducers: {
    saveMyCharacter: (state, action: PayloadAction<Characters>) => {
      state.value = action.payload
    },
    deleteMyCharacter: (state) => {
      state.value = new Characters()
    },
  },
})

// Action creators are generated for each case reducer function
export const { saveMyCharacter } = myCharacterListSlice.actions

export default myCharacterListSlice.reducer
