import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { UnknownAction } from "redux";
import { fetchUsers } from "./redux/fetch-users";
import { UserList } from "./UserList/UserList";

function App() {
  console.log('render app');

  const dispatch = useDispatch();

  useEffect(() => { dispatch(fetchUsers() as unknown as UnknownAction /* всё ещё мда */) }, []);

  return (
    <UserList />
  );
}

export default App;
