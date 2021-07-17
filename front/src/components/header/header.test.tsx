import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import { Provider } from 'react-redux'
import store from '../../store'
import Header from './header'
import { createMemoryHistory } from 'history'
import { Router } from 'react-router-dom'
import { deleteToken, saveToken } from '../../toolkit/userToken/userToken'
import App from '../../screen/app/App'

describe('check if header dipslay', () => {
  const history = createMemoryHistory()
  store.dispatch(saveToken('have a token'))

  test('display log out button', () => {
    const { getByTestId } = render(
      <Provider store={store}>
        <Router history={history}>
          <Header />
        </Router>
      </Provider>
    )
    expect(getByTestId('logOutButton').style.display).toEqual('inline')
  })

  test('onClick log out button', () => {
    const { getByTestId } = render(
      <Provider store={store}>
        <Router history={history}>
          <Header />
        </Router>
      </Provider>
    )

    fireEvent.click(getByTestId('logOutButton'))
    expect(history.location.pathname).toEqual('/')

  })

  test('not display log out button', () => {
    store.dispatch(deleteToken())

    const { getByTestId } = 
      render(
        <Provider store={store}>
          <Router history={history}>
            <Header />
          </Router>
        </Provider>
      )

    expect(getByTestId('logOutButton').style.display).toEqual('none')
    fireEvent.click(getByTestId('reactLogo'))
    expect(history.location.pathname).toEqual('/')

  })
})

describe('onClick react logo when ', () => {
  store.dispatch(saveToken('have a token'))
  const history = createMemoryHistory()
  test('userToken is full', async () => {
    history.push('/characterList')

    render(
      <Provider store={store}>
        <Router history={history}>
          <App />
        </Router>
      </Provider>
    )

    fireEvent.click(screen.getByTestId('reactLogo'))

    await waitFor(() =>
      expect(history.location.pathname).toEqual('/characterList')
    )
  })

  test('userToken is empty', () => {
    const history = createMemoryHistory()
    store.dispatch(deleteToken())
    history.push('/characterList')

    const { getByTestId } = 
      render(
        <Provider store={store}>
          <Router history={history}>
            <Header />
          </Router>
        </Provider>
      )

    fireEvent.click(getByTestId('reactLogo'))
    expect(history.location.pathname).toEqual('/')
  })
})
