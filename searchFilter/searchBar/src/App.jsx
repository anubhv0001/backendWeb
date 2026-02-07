import React, { useState } from "react";
import "./App.css";


function App(){
const [todos,setTodos]=useState([])
const [input,setInput]=useState("");


const addTodo=()=>{
  if (input.trim()=="") return 
  setTodos([
  ...todos,
  {
    id:Date.now(),
    text:input,
    completed:false,
  },
]);
setInput("");
}

const toggleTodo=(id)=>{
  setTodos(
    todos.map((todo)=>
    todo.id==id
    ?{...todo,completed:!todo.completed}
    :todo
    )
  );
};



const deleteTodo=(id)=>{
  setTodos( todos.filter((todo) => todo.id!==id))
}





return (

 <div className="app">
  <h1>Todo App</h1>
<div className="input-box">
  <input type="text" placeholder="Enter todo"value={input}onChange={(e)=>setInput(e.target.value)} />

  <button onClick={addTodo}>Add</button>
</div>
<ul>

 {todos.map((todo) => (
<li key={todo.id} 
className={todo.completed ? "done" : ""} 
>
  <span onClick={()=>toggleTodo(todo.id)}>
    {todo.text}
  </span>
  <button onClick={()=>deleteTodo(todo.id)}>Delete</button>
</li>
))}
</ul>
</div>
)
}
export default App;
