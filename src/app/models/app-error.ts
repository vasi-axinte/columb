export interface AppError {
    type: string;
    title: string;
    status: number;
    traceId: string;
    errors: AppRegisterUserErrorList;
  }

export interface AppRegisterUserErrorList{
  Email: string[];
  Password: string[];
  FirstName: string[];
  LastName: string[];
  Sex: string[];
  Structure: string[];
  BirthYear: string[];
}