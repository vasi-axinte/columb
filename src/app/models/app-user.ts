import { StateEnum } from "./state.enum";
import { RoleEnum } from "./role.enum";

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
    canRequestTiafAccess: boolean;
    hasTiafAccess: boolean;
    historicalUser: HistoricalUser | null;
    userRole: RoleEnum;
    userRoleId: string;
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
  wasChecked: boolean;
}