import { Characters } from '../../class/character'
import reducer, { saveMyCharacter,  deleteMyCharacter } from './userCharacter'
const Character = new Characters()
const basicOpponent =  { ...Character }

test('should return the initial state', () => {
  expect(reducer(undefined,{}).value).toEqual(basicOpponent)
})

test('should handle a new character being added to an empty list', () => {
  const previousState = { value: basicOpponent }
  const newState = { ...basicOpponent, name: 'test name' }
  expect(reducer(previousState, saveMyCharacter(newState)).value).toEqual(newState)
})

test('should delete character', () => {
  const previousState = { value:{ ...basicOpponent, name: 'test name' } }
  expect(reducer(previousState, deleteMyCharacter()).value).toEqual(basicOpponent)
})
