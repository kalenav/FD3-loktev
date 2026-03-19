import { useMemo } from "react";
import { UserList } from "./UserList/UserList";
import { IUser } from "./user.interface";

function App() {
  console.log('render app');

  const users = useMemo(() => [
    { id: 1, name: 'Иван', surname: 'Иванов', middleName: 'Иванович', balance: 200, status: 'active' },
    { id: 2, name: 'Сидор', surname: 'Сидоров', middleName: 'Сидорович', balance: 180, status: 'active' },
    { id: 3, name: 'Пётр', surname: 'Петров', middleName: 'Петрович', balance: 250, status: 'active' },
    { id: 4, name: 'Мария', surname: 'Сидорова', middleName: 'Петровна', balance: -220, status: 'blocked' },
  ] as IUser[], []);

  return (
    <UserList data={users} />
  );
}

export default App;
