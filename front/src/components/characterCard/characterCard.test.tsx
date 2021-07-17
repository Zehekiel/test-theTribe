import { render } from '@testing-library/react'
import { Characters } from '../../class/character'
import CharacterCard from './characterCard'

const mock = jest.fn()
const Character: Characters = new Characters()

describe('display character card if it\'s', () => {
  test('not selected', () => {
    const { getByTestId } = render(
      <CharacterCard oneCharacter={Character} selected={false} onClickCard={mock}/>
    )
    expect(getByTestId('characterCard').style.boxShadow).toEqual('3px 3px black')
  })

  test('selected', () => {
    const { getByTestId } = render(
      <CharacterCard oneCharacter={Character} selected={true} onClickCard={mock}/>
    )
    expect(getByTestId('characterCard').style.boxShadow).toEqual('0px 0px 2px 4px lightgreen')
  })
})

describe('if character is', () => {

  test('available', async () => {
    const { getByTestId } = render(
      <CharacterCard oneCharacter={new Characters()} selected={false} onClickCard={mock}/>
    )
    expect(getByTestId('primitiveDot').style.color).toEqual('green')
  })

  test('not available', async () => {
    const notAvailableCharacter = { ... Character, ['lastFight'] : new Date().getTime() * 2  }
    const { getByTestId } = render(
      <CharacterCard oneCharacter={notAvailableCharacter} selected={false} onClickCard={mock}/>
    )
    expect(getByTestId('primitiveDot').style.color).toEqual('red')
  })
})

describe('if character, 1 time, ', () => {
  const CharacterWin = { ... Character, historic : [
    {
      turnCount:  1,
      isWinner: true,
      opponentName: '',
      date: new Date(),
    }
  ] }

  test('win', async () => {
    const { getByTestId } = render(
      <CharacterCard oneCharacter={CharacterWin} selected={false} onClickCard={mock}/>
    )
    expect(getByTestId('winCount')).toHaveTextContent('1')
  })

  test('lost', async () => {
    const CharacterLost = { ... Character, historic : [
      {
        turnCount:  1,
        isWinner: false,
        opponentName: '',
        date: new Date(),
      }
    ] }
    const { getByTestId } = render(
      <CharacterCard oneCharacter={CharacterLost} selected={false} onClickCard={mock}/>
    )
    expect(getByTestId('losCount')).toHaveTextContent('1')
  })})
