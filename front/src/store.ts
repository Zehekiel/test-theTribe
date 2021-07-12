import { configureStore } from '@reduxjs/toolkit'
import characterListSlice from './toolkit/userCharacterList'
import tokenSlice from './toolkit/userToken'
import opponentSlice from './toolkit/opponent'

const store = configureStore({
  reducer: {
    userToken: tokenSlice,
    characterList: characterListSlice,
    opponent: opponentSlice,
  },
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store
