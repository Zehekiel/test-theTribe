import { Characters } from '../../class/character'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'

const Character = new Characters()
const basicCharacter =  { ...Character }

export const myCharacterListSlice = createSlice({
  name: 'characterList',
  initialState: {
    value: basicCharacter
  },
  reducers: {
    saveMyCharacter: (state, action: PayloadAction<Characters>) => {
      state.value = action.payload
    },
    deleteMyCharacter: (state) => {
      state.value = basicCharacter
    },
  },
})

// Action creators are generated for each case reducer function
export const { saveMyCharacter, deleteMyCharacter } = myCharacterListSlice.actions

export default myCharacterListSlice.reducer
