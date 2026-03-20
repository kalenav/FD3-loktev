import { EventEmitter } from "events";
import { useCallback, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setUsers } from "../redux/users.slice";
import { IUser } from "../user.interface";
import { User } from "./User/User";

const EMPTY_USER: Omit<IUser, 'id'> = {
  name: '',
  surname: '',
  middleName: '',
  balance: 0,
  status: 'active',
};

export function UserList() {
  const dispatch = useDispatch();
  const { list: users, error, isLoading } = useSelector((state: { users: {
    list: IUser[]
    error: string | null
    isLoading: boolean
  } }) => state.users);

  const addUser = useCallback(() => {
    const newId = users.at(-1)?.id ?? 0 + 1;
    dispatch(setUsers([...users, { ...EMPTY_USER, id: newId }]));
  }, [users]);

  const [statusFilter, setStatusFilter] = useState<null | 'active' | 'blocked'>(null);
  const filteredUsers = useMemo(() => {
    if (!statusFilter) {
      return users.slice();
    }
    return users.filter(user => user.status === statusFilter);
  }, [users, statusFilter]);

  const actionsEventEmitter = useMemo(() => {
    const emitter = new EventEmitter();
    emitter.on('userEdit', (editedUser: IUser) => {
      dispatch(setUsers(users.map(user => user.id === editedUser.id ? editedUser : user)));
    });
    emitter.on('userDelete', (id: number) => {
      dispatch(setUsers(users.filter(user => user.id !== id)));
    });
    return emitter;
  }, [users]); // оптимизация рендеринга потерялась - с каждым изменением users приходится делать новый эмиттер

  return (
    <div>
      <div>
        <button onClick={() => setStatusFilter(null)}>Все</button>
        <button onClick={() => setStatusFilter('active')}>Активные</button>
        <button onClick={() => setStatusFilter('blocked')}>Заблокированные</button>
      </div>
      {isLoading && <div>zagruzka...</div>}
      {error && <div style={{ color: 'red' }}>oh noes!! {error}</div>}
      {!isLoading && !error &&<table className="table">
        <thead>
          <tr>
            <th>Фамилия</th>
            <th>Имя</th>
            <th>Отчество</th>
            <th>Баланс</th>
            <th>Статус</th>
            <th colSpan={2}>Редактировать</th>
            <th>Удалить</th>
          </tr>
        </thead>
        <tbody>
          {filteredUsers.map(user => (
            <User
              key={user.id}
              user={user}
              actionsEventEmitter={actionsEventEmitter}
            />
          ))}
        </tbody>
      </table>}
      <button onClick={addUser}>Добавить клиента</button>
    </div>
  );
}