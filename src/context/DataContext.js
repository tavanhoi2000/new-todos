import { createContext, useState } from "react";
export const TodoContext = createContext();
function TodoProvider({ children }) {
  const [listTodo, setListTodo] = useState([]);   
  return (
    <TodoContext.Provider value={[listTodo, setListTodo]}>
      {children}
    </TodoContext.Provider>
  );
}


export default TodoProvider;