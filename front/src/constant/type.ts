import { FightReport } from '../class/fightReport'

export type ProviderApi = { success: boolean; message: string };

export type UserTokenType = { userToken: { value: string } };

export type SettingCharacters = {
  skillPoint?: number ;

  health?: number;

  attack?: number;

  defense?: number;

  magik?: number;

  level?: number;

  lastFight?: number;

  historic?: Array<FightReport>;
}

export type ReporType= {
  finish: boolean, 
  winner: string, 
  attacker: {
    attackDid: number,
    healthLost: number
  }, 
  defender: {
    attackDid: number,
    healthLost: number
  }
}
