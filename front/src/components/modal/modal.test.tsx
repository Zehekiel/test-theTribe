import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import Modal from './modal'

const mock = jest.fn()

describe('check if Modal', () => {
  let isOpen = true
  test('appear', () => {
    const { getByTestId } = render(
      <Modal 
        isShowing={isOpen}
        hide={ ()=> isOpen = false }
        title= 'title'
      >
        <p> children </p>
      </Modal>
    )
    expect(getByTestId('modal-overlay').style.display).toEqual('block')
    expect(getByTestId('modal-title')).toHaveTextContent('title')
    expect(getByTestId('modal-body').children.length).toEqual(1)

    fireEvent.click(getByTestId('modal-close-button'))

    waitFor(()=>
      expect(screen.getByTestId('modal-overlay').style.display).toEqual('none')
    ) 

  })

  test('not appear', () => {
    const { getByTestId } = render(
      <Modal 
        isShowing={false}
        hide={ mock }
        title= 'title'
      >
        <p> children </p>
      </Modal>
    )
    expect(getByTestId('modal-overlay').style.display).toEqual('none')

  })

})

