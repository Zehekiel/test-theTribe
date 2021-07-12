import React from 'react'
import { render, screen } from '@testing-library/react'
import App from './App'
import { Provider } from 'react-redux'
import store from '../../store'

test('always renders header', () => {
  render(
    <Provider store={store}>
      <App />
    </Provider>
  )
  const header = screen.getByTestId('header')
  expect(header).toBeInTheDocument()
})
