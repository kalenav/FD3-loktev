import { EventEmitter } from "events";
import { useCallback, useMemo, useState } from "react";
import { IUser } from "../user.interface";
import { User } from "./User/User";

const EMPTY_USER: Omit<IUser, 'id'> = {
  name: '',
  surname: '',
  middleName: '',
  balance: 0,
  status: 'active',
};

export function UserList({ data }: { data: IUser[] }) {
  const [users, setUsers] = useState(data);
  const addUser = useCallback(() => {
    setUsers(prevUsers => [...prevUsers, { ...EMPTY_USER, id: (prevUsers.at(-1)?.id ?? 0) + 1 }]);
  }, []);

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
      setUsers(prevUsers => prevUsers.map(user => user.id === editedUser.id ? editedUser : user));
    });
    emitter.on('userDelete', (id: number) => {
      setUsers(prevUsers => prevUsers.filter(user => user.id !== id));
    });
    return emitter;
  }, []);
  // так и не понял, в чём конкретно здесь проблема. копилот сказал, что из-за дев режима
  // компоненты маунтятся дважды и чето там куда-то туда-сюда и короче этот cleanup
  // отрабатывает в неожиданный момент, из-за чего теряются подписчики
  // useEffect(() => () => {
  //   actionsEventEmitter.removeAllListeners();
  // }, [actionsEventEmitter]);

  return (
    <div>
      <div>
        <button onClick={() => setStatusFilter(null)}>Все</button>
        <button onClick={() => setStatusFilter('active')}>Активные</button>
        <button onClick={() => setStatusFilter('blocked')}>Заблокированные</button>
      </div>
      <table className="table">
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
      </table>
      <button onClick={addUser}>Добавить клиента</button>
    </div>
  );
}