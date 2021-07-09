import { configureStore } from '@reduxjs/toolkit'
import characterListSlice from './toolkit/userCharacterList'
import tokenSlice from './toolkit/userToken'

const store = configureStore({
  reducer: {
    userToken: tokenSlice,
    characterList: characterListSlice
  }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export default store
