export class UpdateUser {
    public userId: string;
    public firstName: string;
    public lastName: string;
    public structure: string;
    public sex: boolean;
    public birthYear: number;
  
    constructor(userId: string, firstName:string, lastName:string, structure:string, sex:boolean, birthYear:number) {
      this.userId = userId;
      this.firstName = firstName;
      this.lastName = lastName;
      this.structure = structure;
      this.sex = sex;
      this.birthYear = birthYear;
    }
  }