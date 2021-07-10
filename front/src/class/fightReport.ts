export class FightReport {
  turnCount: number = 1 // (start at 1)

  attacksValue: number = 0 // Attack's value for both characters

  healthPointSubstracted: number = 0 // Health point substracted for both characters

  result: 'win' | 'loose' = 'loose'
}
