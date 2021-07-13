import { createContext, useState } from "react";

const TodosContext = createContext();

const TodosProvider = ({ children }) => {
  const [todos, setTodos] = useState([]);
  const refreshTodos = async () => {
    try {
      const res = await fetch("/api/getTodos");
      const latestTodos = await res.json();
      //state change on fetch above
      setTodos(latestTodos);
    } catch (err) {
      console.error(err);
    }
  };

  const addTodo = async (description) => {
    try {
      const res = await fetch("/api/createTodos", {
        method: "POST",
        body: JSON.stringify({ description }), //in createTodo.js, we have description in body
        headers: { "Content-Type": "application/json" },
      });
      const newTodo = await res.json();
      //state change on fetch above
      setTodos((prevTodos) => {
        return [newTodo, ...prevTodos]; //order is important as well
      });
    } catch (err) {
      console.error(err);
    }
  };

  const updateTodo = async (updatedTodo) => {
    try {
      const res = await fetch("/api/updateTodo", {
        method: "PUT",
        body: JSON.stringify({ updatedTodo }), //in createTodo.js, we have description in body
        headers: { "Content-Type": "application/json" },
      });
      // const newTodo =
      await res.json();

      // EXECUTING IN AIRTABLE DONE TILL ABOVE!!!!!! NOW UPDATING IN MEMORY BELOW

      //override/write the fields
      setTodos((prevTodos) => {
        const existingTodos = [...prevTodos];
        //find id matching with this updated todo
        const existingTodo = existingTodos.find(
          (todo) => todo.id === updatedTodo.id
        );
        existingTodo.fields = updatedTodo.fields;
        return existingTodos;
      });
    } catch (err) {
      console.error(err);
    }
  };

  const deleteTodo = async (id) => {
    try {
      //waiting for it to succesfuullly happen
      await fetch("api/deleteTodo", {
        method: "Delete",
        body: JSON.stringify({ id }),
        headers: { "Content-Type": "application/json" },
      });

      setTodos((prevTodos) => {
        //updating the todos by filtering the one out that we just deleted
        return prevTodos.filter((todo) => todo.id !== id);
      });
    } catch (err) {
      console.error(err);
    }
  };

  // give initial value to ToDosContext.Provider
  return (
    // todos: property, rest are functions
    <TodosContext.Provider
      value={{ todos, setTodos, refreshTodos, updateTodo, deleteTodo, addTodo }}
    >
      {children}
    </TodosContext.Provider>
  );
};
export { TodosProvider, TodosContext };
