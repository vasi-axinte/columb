export class CreateUser {
    public email: string;
    public password: string;
    public firstName: string;
    public lastName: string;
    public structure: string;
    public sex: boolean;
    public birthYear: number;
  
    constructor(email: string, password: string, firstName:string, lastName:string, structure:string, sex:boolean, birthYear:number) {
      this.email = email;
      this.password = password;
      this.firstName = firstName;
      this.lastName = lastName;
      this.structure = structure;
      this.sex = sex;
      this.birthYear = birthYear;
    }
  }