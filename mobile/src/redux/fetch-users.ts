import { createAsyncThunk } from "@reduxjs/toolkit";

interface BackendUser {
  id: number,
  im: string,
  fam: string,
  otch: string,
  balance: number
}

export const fetchUsers = createAsyncThunk('users/fetchUsers', async () => {
  const response = await fetch('https://fe.it-academy.by/Examples/mobile_company.json');
  const { clientsArr } = await response.json();
  const mapped = clientsArr.map((rawUser: BackendUser) => ({
    id: rawUser.id,
    name: rawUser.im,
    surname: rawUser.fam,
    middleName: rawUser.otch,
    balance: rawUser.balance,
    status: 'active',
  }));
  return mapped;
});