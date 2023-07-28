import { todoItemCollection } from "../configs/firebase";
import { getDocs } from "firebase/firestore";
const ADD_TODO = "ADD_TODO";
const DELETE_TODO = "DELETE_TODO";
const FETCH_TODO_REQUEST = "FETCH_TODO_REQUEST";
const FETCH_TODO_SUCCESS = "FETCH_TODO_SUCCESS";
const FETCH_TODO_FAILURE = "FETCH_TODO_FAILURE";
const getTodosItem = () => {
  return async (dispatch) => {
    dispatch({ type: FETCH_TODO_REQUEST });
    try {
      const data = await getDocs(todoItemCollection);
      const todoItem = data.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      dispatch({ type: FETCH_TODO_SUCCESS, payload: todoItem });
    } catch (error) {
      dispatch({ type: FETCH_TODO_FAILURE, payload: error.message });
    }
  };
};

export {
  ADD_TODO,
  DELETE_TODO,
  FETCH_TODO_REQUEST,
  FETCH_TODO_SUCCESS,
  FETCH_TODO_FAILURE,
  getTodosItem,
};
