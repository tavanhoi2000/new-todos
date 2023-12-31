import {
  ADD_TODO,
  EDIT_TODO,
  DELETE_TODO,
  FETCH_TODO_REQUEST,
  FETCH_TODO_SUCCESS,
  FETCH_TODO_FAILURE,
} from "../constants/todoAction";

const initialState = {
  todos: [],
  loading: true,
  error: null,
};
const todoReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_TODO_REQUEST:
      return { ...state, loading: true, error: null };
    case FETCH_TODO_SUCCESS:
      return { ...state, loading: false, todos: action.payload };
    case FETCH_TODO_FAILURE:
      return { ...state, loading: false, error: action.payload };
    case ADD_TODO: {
      return {
        ...state,
        todos: [...state.todos, action.payload],
        loading: false,
        error: null,
      };
    }
    case EDIT_TODO: {
      const { id, name } = action.payload;
      const updateTodos = state.todos.map((todo) => {
        if (todo.id === id) {
          return { ...todo, todos: name };
        }
        return todo;
      });
      return { ...state, todos: updateTodos };
    }
    case DELETE_TODO:
      const updateTodo = state.todos.filter(
        (todo) => todo.id !== action.payload
      );
      return { ...state, todos: updateTodo, loading: false, error: null };

    default:
      return state;
  }
};

export default todoReducer;
