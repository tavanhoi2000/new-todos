import { useState, useContext, useEffect } from "react";
import { useSelector } from "react-redux";
import { getTodosItem } from "../constants/todoAction";
import TodoContext from "../context/DataContext";

function Search() {
  const todos = useSelector((state) => state.todos);
  const [searchInput, setSearchInput] = useState("");
  const listTodo = useContext(TodoContext)
  console.log(listTodo);
  useEffect(() => {
    getTodosItem()
  })
  const handleSearchItem = () => {
    const listTodo = [...todos]
    let query = searchInput
    query = listTodo.filter((data) => {
      return data.name.toLowerCase().indexOf(query.toLowerCase()) !== -1
    });

    console.log(listTodo);
  };

  return (
    <div className="input-group">
      <input
        type="text"
        className="form-control"
        value={searchInput}
        onChange={(e) => setSearchInput(e.target.value)}
        placeholder="Search item name"
      />
      <button onClick={handleSearchItem}>search</button>
    </div>
  );
}

export default Search;
