import { useRef, useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {getTodosItem} from '../constants/todoAction'
import { getAllUsers, handleDelete, handleUpdate } from "../services";

function TodoList() {
  const dispatch = useDispatch()
  const todos = useSelector((state) => state.todos)
  const loading = useSelector((state) =>state.loading)
  const error = useSelector((state) => state.error)
  const [inputChange,setInputChange] = useState('')

  useEffect(() => {
    dispatch(getTodosItem())
  },[dispatch])

  const handleInputChange = (e) => {
    setInputChange(e.target.value)
  }

  if(loading) {
    return <p>loading...</p>
  }


  return (
    <div className="panel panel-success">
      <div className="panel-heading">List Item</div>
      <table className="table table-hover">
        <thead>
          <tr>
            <th style={{ width: "10%" }} className="text-center">
              #
            </th>
            <th style={{ textAlign: "center" }}>Name</th>
            <th style={{ width: "15%" }} className="text-center">
              Level
            </th>
            <th style={{ width: "20%" }}>Action</th>
          </tr>
        </thead>
        <tbody>
          {todos &&
            todos.map((todo,index) => {
              return (
                <tr key={todo.id}>
                  <td className="text-center">{index + 1}</td>
                  {isEdit ? (
                    <td>
                      {itemId === item.id ? (
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Write new name you want updadte"
                          ref={refValue}
                          value={inputChange}
                          onChange={handleInputChange}
                        />
                      ) : (
                        todo.name
                      )}
                    </td>
                  ) : (
                    <td className="change-value">{todo.name}</td>
                  )}
                  <td className="text-center">
                    <span className="label label-danger">High</span>
                  </td>
                  <td>
                    {isEdit && itemId === todo.id ? (
                      <button
                        type="button"
                        onClick={(e) => cancelDelete(e)}
                        className="btn btn-default btn-sm"
                      >
                        Cancel
                      </button>
                    ) : (
                      <button
                        type="button"
                        onClick={() => handleValue(todo.id)}
                        className="btn btn-warning btn-sm"
                      >
                        Edit
                      </button>
                    )}
                    <button
                      type="button"
                      onClick={() => handleDelete(todo.id)}
                      className="btn btn-danger btn-sm"
                    >
                      Delete
                    </button>
                    {isEdit && itemId === todo.id ? (
                      <button
                        type="button"
                        onClick={() => handleSaveUpdate(todo.id, todo)}
                        className="btn btn-success btn-sm"
                      >
                        Save
                      </button>
                    ) : (
                      ""
                    )}
                  </td>
                </tr>
              );
            })}
        </tbody>
      </table>
    </div>
  );
}

export default TodoList;
