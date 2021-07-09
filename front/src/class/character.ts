export class Characters {
  _id: string = ''

  name: string = ''

  skillPoint: number = 12

  health: number = 10

  attack: number = 0

  defense: number = 0

  magik: number = 0

  level: number = 1

  lastFight: number= 0

  historic: Array<{
    turnCount: number // (start at 1)
    attacksValue: number // Attack's value for both characters
    healthPointSubstracted: number // Health point substracted for both characters
    result: 'win' | 'loose'
  }> = []
}