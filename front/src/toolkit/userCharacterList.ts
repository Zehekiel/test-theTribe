import { Characters } from './../class/character'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export const characterListSlice = createSlice({
  name: 'characterList',
  initialState: {
    value: new Array()
  },
  reducers: {
    saveList: (state, action: PayloadAction<Array<Characters>>) => {
      state.value = action.payload
    },
    addCharacter: (
      state: { value: Array<any> },
      action: PayloadAction<Characters>
    ) => {
      state.value.push(action.payload)
    },
    emptyList: (state) => {
      state.value = []
    },
  },
})

// Action creators are generated for each case reducer function
export const { saveList, addCharacter, emptyList } = characterListSlice.actions

export default characterListSlice.reducer
