import { useEffect, useState, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import update from 'immutability-helper'
import Todo from './Todo'
import { getTodosItem } from "../constants/todoAction";
import { moveItem } from "../constants/todoAction";
function TodoList() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getTodosItem());
  }, [dispatch]);
  const loading = useSelector((state) => state.loading);
  const error = useSelector((state) => state.error);
  const todos = useSelector((state) => state.todos);
  const [listTodo, setListTodo] = useState(todos)

  const moveTodo = useCallback((dragIndex, hoverIndex) => {
    setListTodo((prev) => {
      return update(prev, {
        $splice: [[dragIndex, 1], [hoverIndex, 0, prev[dragIndex]]],
      })
    })
    dispatch(moveItem(dragIndex,hoverIndex))
  }, [])

  if (loading) {
    return <p>loading...</p>;
  }
  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <div className="panel panel-success">
      <div className="panel-heading">List Item</div>
      <table className="table table-hover">
        <thead>
          <tr>
            <th className="text-center stt">
              #
            </th>
            <th className="text-center">Name</th>
            <th className="text-center level">
              Level
            </th>
            <th className="text-center action">Action</th>
          </tr>
        </thead>
        <tbody>
          {todos&& todos.map((todo, index) =>
            <Todo key={todo.id} todo={todo} index={index} moveTodo={moveTodo}  />
          )}
        </tbody>
      </table>
    </div>
  );
}

export default TodoList;
