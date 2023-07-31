import { useRef, useState } from "react";
import { useDispatch } from "react-redux";
import {addTodo} from '../constants/todoAction'

function AddItem() {
  const dispatch = useDispatch()
  const [inputValue, setInputValue] = useState("");
  const refValue = useRef();
  const [error, setError] = useState(null);

  function handleSubmit(name) {
    if (inputValue !== "") {
      dispatch(addTodo(name))
      setError(null);
    } else {
      setError("Không thể để trống trường này! ");
    }
    refValue.current.focus();
    setInputValue("");
  }
  return (
    <form className="form-inline">
      <div className="form-group">
        <input
          type="text"
          ref={refValue}
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          className="form-control"
          placeholder="Item Name"
        />

        <button
          type="button"
          onClick={() => handleSubmit(inputValue)}
          className="btn btn-primary"
        >
          Add
        </button>
        <button
          type="button"
          onClick={() => setInputValue("")}
          className="btn btn-default"
        >
          Cancel
        </button>
        {error && (
          <p className="text-danger text-start">
            {error}
          </p>
        )}
      </div>
    </form>
  );
}
export default AddItem;
