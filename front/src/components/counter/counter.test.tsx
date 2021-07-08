import { fireEvent, render, waitFor, screen } from '@testing-library/react'
import Counter from './counter'

const mock = jest.fn()

describe('display counter with increment and decrement value', ()=>{
  test('display value', ()=>{
    const { getByTestId } = render(
      <Counter
        onPressPlus= {mock}
        onPressMinus=  {mock}
        value= {0}
      />
    )
      expect(getByTestId('counter-value')).toHaveTextContent('0')
  })
})

describe('change value', ()=>{
  let value = 0
  const decrement = () => { value-- }
  const increment = () =>  { value++ }

  test('increment', async ()=> {
    render(
      <Counter
        onPressPlus= {increment}
        onPressMinus=  {mock}
        value= {value}
      />
    )
    const counterPlus = screen.getByTestId('counter-plus')
    fireEvent.click(counterPlus)
    const { getAllByTestId } = render(
      <Counter
        onPressPlus= {increment}
        onPressMinus=  {mock}
        value= {value}
      />
    )

    await waitFor(async () => 
      expect(getAllByTestId('counter-value')[1]).toHaveTextContent('1'),
    )
  })

  test('decrement', async ()=> {
    render(
      <Counter
        onPressPlus= {mock}
        onPressMinus=  {decrement}
        value= {value}
      />
    )
    const counterMinus = screen.getByTestId('counter-minus')
    fireEvent.click(counterMinus)
    const { getAllByTestId } = render(
      <Counter
        onPressPlus= {mock}
        onPressMinus=  {decrement}
        value= {value}
      />
    )

    await waitFor(async () => 
      expect(getAllByTestId('counter-value')[1]).toHaveTextContent('0'),
    )
  })
})