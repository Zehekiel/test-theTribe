import { configureStore } from '@reduxjs/toolkit'
import characterListSlice from './toolkit/userCharacterList'
import tokenSlice from './toolkit/userToken'
import opponentSlice from './toolkit/opponent'
import myCharacterListSlice from './toolkit/userCharacter'

const store = configureStore({
  reducer: {
    userToken: tokenSlice,
    characterList: characterListSlice,
    opponent: opponentSlice,
    myCharacter: myCharacterListSlice,
  },
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store
