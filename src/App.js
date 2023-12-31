import "./App.css";
import { Provider } from "react-redux";
import store from "./store";
import { createContext, useState } from "react";
import Title from "./components/Title";
import Search from "./components/Search";
import AddItem from "./components/AddItem";
import TodoList from "./components/TodoList";
export const UsersData = createContext();

function App() {
  const [listUser, setListUser] = useState([]);
  return (
    <Provider store={store}>
      <UsersData.Provider value={[listUser, setListUser]}>
        <div className="app">
          <div className="container">
            <Title />

            <div className="row">
              <div className="col-xs-4 col-sm-4 col-md-4 col-lg-4">
                <Search />
              </div>
              <div className="col-xs-3 col-sm-3 col-md-3 col-lg-3"></div>
              <div className="col-xs-5 col-sm-5 col-md-5 col-lg-5 marginB10">
                <AddItem />
              </div>
            </div>

            <TodoList />
          </div>
        </div>
      </UsersData.Provider>
    </Provider>
  );
}

export default App;
