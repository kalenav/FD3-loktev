import EventEmitter from "events";
import { memo, useCallback, useRef, useState } from "react";
import { IUser } from "../../user.interface";
import './User.scss';

export const User = memo(({
  user,
  actionsEventEmitter,
}: {
  user: IUser,
  actionsEventEmitter: EventEmitter,
}) => {
  console.log(`render user ${user.surname}`);

  const [editing, setIsEditing] = useState(false);
  const [nameRef, surnameRef, middleNameRef, balanceRef, statusRef] = [
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLSelectElement>(null),
  ];
  const onEditConclude = useCallback(() => {
    setIsEditing(false);
    actionsEventEmitter.emit('userEdit', {
      id: user.id,
      name: nameRef.current?.value ?? user.name,
      surname: surnameRef.current?.value ?? user.surname,
      middleName: middleNameRef.current?.value ?? user.middleName,
      balance: Number(balanceRef.current?.value) ?? user.balance,
      status: (statusRef.current?.value as 'active' | 'blocked') ?? user.status,
    });
  }, [user, actionsEventEmitter]);

  return (
    <tr>
      <td>{editing
        ? <input type="text" ref={surnameRef} defaultValue={user.surname} />
        : user.surname}
      </td>
      <td>{editing
        ? <input type="text" ref={nameRef} defaultValue={user.name} />
        : user.name}
      </td>
      <td>{editing
        ? <input type="text" ref={middleNameRef} defaultValue={user.middleName} />
        : user.middleName}
      </td>
      <td>{editing
        ? <input type="number" ref={balanceRef} defaultValue={user.balance} />
        : user.balance}
      </td>
      <td className={`status ${user.status} ${editing ? 'editing' : ''}`}>{editing
        ? <select ref={statusRef} defaultValue={user.status}>
          <option value="active">Active</option>
          <option value="blocked">Blocked</option>
        </select>
        : user.status}
      </td>
      <td>
        {editing
          ? <button onClick={onEditConclude}>Сохранить</button>
          : <button onClick={() => setIsEditing(true)}>Редактировать</button>}
      </td>
      <td>
        {editing && <button onClick={() => setIsEditing(false)}>Отменить</button>}
      </td>
      <td>
        <button onClick={() => actionsEventEmitter.emit('userDelete', user.id)}>Удалить</button>
      </td>
    </tr>
  );
});