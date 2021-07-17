import { render } from '@testing-library/react'
import { FinalReport } from '../../class/finalReport'
import FightCard from './fightCard'

const report: FinalReport = new FinalReport()

describe('if fight is', () => {
  const reportWin = { ...report, isWinner: true }
  test('win', () => {
    const { getByTestId } = render(
      <FightCard oneReport={reportWin} />
    )
    expect(getByTestId('trophyCup')).toBeInTheDocument()
  })

  test('lost', () => {
    const { getByTestId } = render(
      <FightCard oneReport={report} />
    )
    expect(getByTestId('deathSkull')).toBeInTheDocument()
  })
})

