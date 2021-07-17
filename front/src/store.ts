import { configureStore } from '@reduxjs/toolkit'
import characterListSlice from './toolkit/userCharacterList/userCharacterList'
import tokenSlice from './toolkit/userToken/userToken'
import opponentSlice from './toolkit/opponent/opponent'
import myCharacterListSlice from './toolkit/userCharacter/userCharacter'

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
