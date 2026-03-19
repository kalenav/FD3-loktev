export interface IUser {
  id: number;
  name: string;
  surname: string;
  middleName: string;
  balance: number;
  status: 'active' | 'blocked';
}