import { Characters } from '../../class/character'
import reducer, {
  saveList,
  deleteOneCharacter,
  setList,
  addCharacter,
  emptyList
} from './userCharacterList'
const Character = new Characters()
const basicOpponent =  { ...Character }

test('should return the initial state of userCharacterList', () => 
  expect(reducer(undefined, {}).value).toEqual([])
)

test('should handle a new characterList being added to an empty list', () => {
  const previousState = { value: [] }
  const newState = [ basicOpponent, basicOpponent ]
  expect(reducer(previousState, saveList(newState)).value).toEqual(newState)
})

test('should handle to delete one character on a full characterList', () => {
  const previousState = { value: [ 
    { ...basicOpponent, _id:'1' }, 
    { ...basicOpponent, _id:'2' },
    { ...basicOpponent, _id:'3' }
  ] }
  const newState = { value: [ 
    { ...basicOpponent, _id:'1' }, 
    { ...basicOpponent, _id:'3' }
  ] }
  expect(reducer(previousState, deleteOneCharacter('2')).value).toEqual(newState.value)
})

test('should handle a set one character on a full characterList', () => {
  const previousState = { value: [ 
    { ...basicOpponent, _id:'1' }, 
    { ...basicOpponent, _id:'2' },
    { ...basicOpponent, _id:'3' }
  ] }
  const newState = { value: [ 
    { ...basicOpponent, _id:'1' }, 
    { ...basicOpponent, _id:'2' },
    { ...basicOpponent, _id:'3' , name: 'test setList' }
  ] }
  expect(reducer(previousState, setList({ ...Character, _id:'3', name: 'test setList' })).value).toEqual(newState.value)
})

test('should handle to add one character on a full characterList', () => {
  const previousState = { value: [ 
    { ...basicOpponent, _id:'1' }, 
    { ...basicOpponent, _id:'2' },
  ] }
  const newState = { value: [ 
    { ...basicOpponent, _id:'1' }, 
    { ...basicOpponent, _id:'2' },
    { ...basicOpponent, _id:'3' }
  ] }
  expect(reducer(previousState, addCharacter({ ...Character, _id:'3' })).value).toEqual(newState.value)
})

test('should handle to delete all character of a full characterList', () => {
  const previousState = { value: [ 
    { ...basicOpponent, _id:'1' }, 
    { ...basicOpponent, _id:'2' },
  ] }
  const newState = { value: [] }
  expect(reducer(previousState, emptyList()).value).toEqual(newState.value)
})
