import { useState, useRef } from "react";
import { useDispatch } from "react-redux";
import { updateTodo, deleteTodo } from "../constants/todoAction";
import { useDrag, useDrop } from "react-dnd";
import { MOVE_TODO } from "../constants/todoAction";
import { database } from "../configs/firebase";
function Todo({ todo, index, moveTodo }) {
  const dispatch = useDispatch();
  const [itemId, setItemId] = useState(null);
  const [isEdit, setIsEdit] = useState(false);
  const [inputChange, setInputChange] = useState("");
  const refInput = useRef();
  const ref = useRef(null)

  const saveDb = (newTodos) => {
    database.child('todoItem').set(newTodos)
  }
  const [{ handlerId }, drop] = useDrop({
    accept: MOVE_TODO,
    collect(monitor) {
      return {
        handlerId: monitor.getHandlerId(),
      }
    },
    hover(item, monitor) {
      if (!ref.current) {
        return
      }
      const dragIndex = item.index
      const hoverIndex = index

      if (dragIndex === hoverIndex) {
        return
      }
      const hoverBoundingRect = ref.current?.getBoundingClientRect()
      const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2
      const clientOffset = monitor.getClientOffset()
      const hoverClientY = clientOffset.y - hoverBoundingRect.top
      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return
      }
      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return
      }
      dispatch(moveTodo(dragIndex, hoverIndex))
      saveDb(todo)
      item.index = hoverIndex
    }
  })

  const [{ isDragging }, drag] = useDrag({
    type: MOVE_TODO,
    item: () => {
      return {
        id: todo.id,
        index: index,
      }
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  })
  drag(drop(ref))

  const handleSaveUpdate = (id, name) => {
    dispatch(updateTodo(id, name))
    setIsEdit(false)
    setInputChange('')
  };
  const cancelDelete = (e) => {
    setItemId(null)
    setIsEdit(false)
  };
  const handleDelete = (todoId) => {
    dispatch(deleteTodo(todoId));
  };
  const changeInput = async (id) => {
    setItemId(id);
    await setIsEdit(true);
    refInput.current.focus();
  };
  return (
    <>
      <tr key={todo.id} data-handlee-id={handlerId} ref={ref}>
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
    </>
  )
}

export default Todo