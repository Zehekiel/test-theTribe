import { Characters } from '../../class/character'
import reducer, { saveOpponent,  deleteOpponent } from './opponent'
const Character = new Characters()
const basicOpponent =  { ...Character }

test('should return the initial state', () => {
  expect(reducer(undefined,{}).value).toEqual(basicOpponent)
})

test('should handle a new opponent being added to an empty list', () => {
  const previousState = { value: basicOpponent }
  const newState = { ...basicOpponent, name: 'test name' }
  expect(reducer(previousState, saveOpponent(newState)).value).toEqual(newState)
})

test('should delete opponent', () => {
  const previousState = { value:{ ...basicOpponent, name: 'test name' } }
  expect(reducer(previousState, deleteOpponent()).value).toEqual(basicOpponent)
})
