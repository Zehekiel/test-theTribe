import reducer, { saveToken,  deleteToken } from './userToken'

test('should return the initial state', () => {
  expect(reducer(undefined,{}).value).toEqual('')
})

test('should handle a new opponent being added to an empty list', () => {
  const previousState = { value: '' }
  const newState = 'have a token'
  expect(reducer(previousState, saveToken(newState)).value).toEqual('have a token')
})

test('should delete opponent', () => {
  const previousState = { value: 'have a token' }
  expect(reducer(previousState, deleteToken()).value).toEqual('')
})
