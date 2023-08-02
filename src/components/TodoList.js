import { useRef, useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getTodosItem, deleteTodo,updateTodo } from "../constants/todoAction";
function TodoList() {
  const dispatch = useDispatch();
  const todos = useSelector((state) => state.todos);
  const loading = useSelector((state) => state.loading);
  const error = useSelector((state) => state.error);
  const [inputChange, setInputChange] = useState("");
  const [isEdit, setIsEdit] = useState(false);
  const [itemId, setItemId] = useState(null);
  const refInput = useRef();
  const handleDelete = (todoId) => {
    dispatch(deleteTodo(todoId));
  };
  useEffect(() => {
    dispatch(getTodosItem());
  }, [dispatch]);

  const cancelDelete = (e) => {
    setItemId(null)
    setIsEdit(false)
  };

  const changeInput = async(id) => {
    setItemId(id);
    await setIsEdit(true);
    refInput.current.focus();
  };

  const handleSaveUpdate = (id, name) => {
    dispatch(updateTodo(id,name))
    setIsEdit(false)
    setInputChange('')
  };

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
          {todos &&
            todos.map((todo, index) => {
              return (
                <tr key={index}>
                  <td className="text-center stt">{index + 1}</td>
                  {isEdit ? (
                    <td>
                      {itemId === todo.id ? (
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Write new name you want updadte"
                          ref={refInput}
                          value={inputChange}
                          onChange={(e) => setInputChange(e.target.value)}
                        />
                      ) : (
                        todo.name
                      )}
                    </td>
                  ) : (
                    <td className="change-value">{todo.name}</td>
                  )}

                  <td className="text-center level">
                    <span className="label label-danger ">High</span>
                  </td>
                  <td className="button">
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
                        onClick={() => changeInput(todo.id)}
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
                    {isEdit && todo.id === itemId ? (
                      <button
                        type="button"
                        onClick={() => handleSaveUpdate(todo.id, inputChange)}
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
