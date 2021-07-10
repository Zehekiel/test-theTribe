import { FightReport } from './fightReport'

export class Characters {
  _id: string = '';

  name: string = '';

  skillPoint: number = 12;

  health: number = 10;

  attack: number = 0;

  defense: number = 0;

  magik: number = 0;

  level: number = 1;

  lastFight: number = 0;

  historic: Array<FightReport> = [];
}
