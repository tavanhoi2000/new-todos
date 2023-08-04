import {
  ADD_TODO,
  EDIT_TODO,
  DELETE_TODO,
  SEARCH_TODO,
  MOVE_TODO,
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
      const updateTodos = state.todos.map((todo) => 
        todo.id === id ? {...todo, name: name} : todo
      );
      return { ...state, todos: updateTodos,loading:false, error:null };
    }
    case DELETE_TODO:
      const updateTodo = state.todos.filter(
        (todo) => todo.id !== action.payload
      );
      return { ...state, todos: updateTodo, loading: false, error: null };
    // case SEARCH_TODO: return {...state, searchResult: action.payload}
    case MOVE_TODO: 
        const {dragIndex, hoverIndex} = action.payload
        const newTodo = [...state.todos]
        const dragItem = newTodo[dragIndex]
        newTodo.splice(dragIndex,1)
        newTodo.splice(hoverIndex,0, dragItem)
        return {...state, todos: newTodo}
    default:
      return state;
  }
};

export default todoReducer;
