import { setError, setIsLoading, setUsers } from "./users.slice";

interface BackendUser {
  id: number,
  im: string,
  fam: string,
  otch: string,
  balance: number
}

export async function fetchUsers(dispatch: (action: { type: string; payload?: unknown }) => void) {
  dispatch(setIsLoading(true));
  try {
    const response = await fetch('https://fe.it-academy.by/Examples/mobile_company.json');
    const { clientsArr } = await response.json();
    const mapped = clientsArr.map((rawUser: BackendUser) => ({
      ...rawUser,
      name: rawUser.im,
      surname: rawUser.fam,
      middleName: rawUser.otch,
      balance: rawUser.balance,
      status: 'active',
    }));
    dispatch(setUsers(mapped));
  } catch (error) {
    dispatch(setError((error as Error).message ?? 'chto-to poshlo ne tak...'));
  } finally {
    dispatch(setIsLoading(false));
  }
}