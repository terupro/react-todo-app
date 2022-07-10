import './App.css';
import TodoList from './components/TodoList';
import { useState, useRef } from 'react';
import {v4 as uuidv4} from 'uuid';

function App() {
  const [todos, setTodos] = useState([
    {id: 1, name: "Todo1", completed: false},
  ]);
  
  // 要素を取得できるのがuseRef
  const todoNameRef = useRef();
  
  // 追加
  const handleAddTodo = () => {
    const name = todoNameRef.current.value;
    if (name === "") return;
    setTodos((prevTodos) => {
      return [...prevTodos, {id: uuidv4(), name: name, completed: false}];
    })
    todoNameRef.current.value = null;
  }; 

  // 削除
  const handleClear = () => {
    const newTodos = todos.filter((todo) => !todo.completed);
    setTodos(newTodos);
  }
  
  // チェックボックス
  const toggleTodo = (id) => {
    const newTodos = [...todos];
    const todo = newTodos.find((todo) => todo.id === id);
    todo.completed = !todo.completed;
    setTodos(newTodos);
  };

  return (
    <div>
    <TodoList todos={todos} toggleTodo={toggleTodo}/>
    <input type="text" ref={todoNameRef} />
    <button onClick={handleAddTodo}>タスクの追加</button>
    <button onClick={handleClear}>完了したタスクの削除</button>
    <div>残りのタスク:{todos.filter((todo) => !todo.completed).length}</div>
    </div>
  );
}

export default App;
