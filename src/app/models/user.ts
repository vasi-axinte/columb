import { StateEnum } from "./state.enum";

export class User {
    public name: string;
    public email: string;
    public state: StateEnum;
    public roles: string[];
    public token: string;
  
    constructor(name: string, email: string, roles: string[], state: StateEnum, token: string) {
      this.name = name;
      this.email = email;
      this.state = state;
      this.roles = roles;
      this.token = token;
    }
  }