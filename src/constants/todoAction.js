import { todoItemCollection } from "../configs/firebase";
import { getDocs, addDoc, deleteDoc, doc, updateDoc } from "firebase/firestore";
import { db } from "../configs/firebase";
const ADD_TODO = "ADD_TODO";
const EDIT_TODO = "EDIT_TODO";
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

const addTodo = (name) => {
  return async (dispatch) => {
    const data = {
      name: name,
    };
    await addDoc(todoItemCollection, data);
    dispatch({ type: ADD_TODO, payload: data });
  };
};

const updateTodo = (id, name) => {
  return async (dispatch) => {
      await updateDoc(doc(todoItemCollection, id), { name: name });
      dispatch({ type: EDIT_TODO, payload: { id, name } });
    } 
  };

const deleteTodo = (todoId) => {
  return async (dispatch) => {
    let todoDoc = doc(db, "todoItem", todoId);
    await deleteDoc(todoDoc);
    dispatch({ type: DELETE_TODO, payload: todoId });
  };
};

export {
  ADD_TODO,
  EDIT_TODO,
  DELETE_TODO,
  FETCH_TODO_REQUEST,
  FETCH_TODO_SUCCESS,
  FETCH_TODO_FAILURE,
  getTodosItem,
  addTodo,
  deleteTodo,
  updateTodo,
};
