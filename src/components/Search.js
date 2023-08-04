import { useState, useContext, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getTodosItem } from "../constants/todoAction";
// import { searchTodo } from "../constants/todoAction";
function Search() {
  const [searchInput, setSearchInput] = useState("");
  const dispatch = useDispatch()
  useEffect(() => {
    getTodosItem()
  })
  // const handleSearchItem = (query) => {
  //   dispatch(searchTodo(query))
  // };

  return (
    <div className="input-group">
      <input
        type="text"
        className="form-control"
        value={searchInput}
        onChange={(e) => setSearchInput(e.target.value)}
        placeholder="Search item name"
      />
      {/* <button onClick={handleSearchItem(searchInput)}>search</button> */}
    </div>
  );
}

export default Search;
