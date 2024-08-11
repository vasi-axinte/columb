export class UpdateUser {
    public userId: string;
    public firstName: string;
    public lastName: string;
    public structure: string;
    public sex: boolean;
    public birthYear: number;
    public hasTiafAccess: boolean;
  
    constructor(userId: string, firstName:string, lastName:string, structure:string, sex:boolean, birthYear:number, hasTiafAccess:boolean) {
      this.userId = userId;
      this.firstName = firstName;
      this.lastName = lastName;
      this.structure = structure;
      this.sex = sex;
      this.birthYear = birthYear;
      this.hasTiafAccess = hasTiafAccess ? hasTiafAccess : false;
    }
  }