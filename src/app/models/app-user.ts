import { StateEnum } from "./state.enum";

export interface AppUser {
    id: string;
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    structure: string;
    sex: boolean;
    birthYear: number;
    isActive: boolean;
    state: StateEnum;
    historicalUser: HistoricalUser | null;
  }

export interface HistoricalUser {
  id: string;
  userId: string;
  firstName: string;
  lastName: string;
  structure: string;
  sex: boolean;
  birthYear: number;
  timestamp: Date;
}