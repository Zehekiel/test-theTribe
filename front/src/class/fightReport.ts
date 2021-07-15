export class FightReport {
  turnCount: number = 1 // (start at 1)

  finish: boolean = false

  winner: string= '' 

  attacker: {
    attackDid: number,
    healthLost: number
  } = {
    attackDid: 0,
    healthLost: 0
  }

  defender: {
    attackDid: number,
    healthLost: number
  } = {
    attackDid: 0,
    healthLost: 0
  }
}
