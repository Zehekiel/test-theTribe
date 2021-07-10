import { render } from '@testing-library/react'
import ErrorText from './errorText'


describe('test if ErrorText is', ()=>{
  test('display', async ()=> {
    const { container } = render(
      <ErrorText text='' />
    )
    expect(container.children.length).toEqual(0)
  })

  test('not display', async ()=> {
    const { container } = render(
      <ErrorText text='test' />
    )
    expect(container.children.length).toEqual(1)
  })
})