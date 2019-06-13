import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import Spinner from "../components/spinner";
import { useFindAll, useCreate, useResource } from "../hooks/resources";

export default function() {
  let [todos, { isLoading }] = useFindAll("todo");

  let ryansTodos = todos
    .filter(todo => todo.author === "Ryan")
    .sort((a, b) => a.position - b.position);
  let samsTodos = todos
    .filter(todo => todo.author === "Sam")
    .sort((a, b) => a.position - b.position);

  return (
    <div className="mt-8 max-w-5xl px-4 mx-auto">
      <p>
        <Link
          to="/"
          className="uppercase text-sm text-gray-500 font-semibold hover:text-gray-900"
        >
          ← Back to Dashboard
        </Link>
      </p>
      <h1 className="mt-4 text-4xl font-bold">Admin</h1>

      <div className="mt-8">
        {isLoading ? (
          <Spinner />
        ) : (
          <div className="flex -mx-32">
            <div className="w-1/2 mx-32">
              <h3 className="text-xl font-bold">Ryan</h3>

              <div className="mt-4">
                <TodoForm todo={{ author: "Ryan", text: "" }} />
              </div>

              <div className="mt-4">
                <TodoList todos={ryansTodos} />
              </div>
            </div>
            <div className="w-1/2 mx-32">
              <h3 className="text-xl font-bold">Sam</h3>

              <div className="mt-4">
                <TodoForm todo={{ author: "Sam", text: "" }} />
              </div>

              <div className="mt-4">
                <TodoList todos={samsTodos} />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function TodoForm({ todo: seedTodo }) {
  let [localTodo, setLocalTodo] = useState({ ...seedTodo });
  let inputEl = useRef(null);

  let [create, { isSaving }] = useCreate("todo");
  let [todos] = useFindAll("todo");
  let authorsTodo = todos
    .filter(todo => todo.author === localTodo.author)
    .sort((a, b) => a.position - b.position);
  let newPosition = authorsTodo.length
    ? authorsTodo[authorsTodo.length - 1].position + 1
    : 1;

  function handleChange(event) {
    localTodo.text = event.target.value;
    setLocalTodo({ ...localTodo });
  }

  function handleSubmit(event) {
    event.preventDefault();

    localTodo.position = newPosition;

    create(localTodo).then(() => {
      localTodo.text = "";
      setLocalTodo({ ...localTodo });
      inputEl.current.focus();
    });
  }

  return (
    <form onSubmit={handleSubmit} className="relative flex items-center">
      <input
        className={`w-full shadow-md bg-white px-3 py-2 rounded focus:outline-none ${isSaving &&
          "opacity-50"}`}
        type="text"
        placeholder="Add a todo..."
        value={localTodo.text}
        onChange={handleChange}
        disabled={isSaving}
        ref={inputEl}
      />
    </form>
  );
}

function TodoList({ todos, updateTodos, removeTodo }) {
  return (
    <ul>
      {todos
        .sort((a, b) => a.position - b.position)
        .map(todo => (
          <li key={todo.id}>
            <Todo todo={todo} didSave={updateTodos} didDelete={removeTodo} />
          </li>
        ))}
    </ul>
  );
}

function Todo({ todo: seedTodo, didSave, didDelete }) {
  let [isEditing, setIsEditing] = useState(false);
  let [localTodo, setLocalTodo] = useState({ ...seedTodo });
  let [isChecked, setIsChecked] = useState(false);

  let [todo, { save, isSaving, destroy }] = useResource("todo", seedTodo.id);

  function handleCheckboxChange(event) {
    setIsChecked(event.target.checked);
  }

  useEffect(() => {
    if (isChecked) {
      let id = setTimeout(() => {
        destroy();
      }, 1000);

      return () => clearTimeout(id);
    }
  }, [isChecked, destroy]);

  function handleCheckboxClick(event) {
    event.stopPropagation();
  }

  function handleButtonClick() {
    setIsEditing(true);
  }

  function handleChange(event) {
    localTodo.text = event.target.value;
    setLocalTodo({ ...localTodo });
  }

  function handleBlur() {
    saveChanges();
  }

  function handleKeyDown(event) {
    if (event.keyCode === 27) {
      setIsEditing(false);
    }
  }

  function handleSubmit(event) {
    event.preventDefault();
    saveChanges();
  }

  function saveChanges() {
    save(localTodo).then(() => {
      setIsEditing(false);
    });
  }

  return (
    <div>
      {isEditing ? (
        <div className="w-full flex bg-gray-100 px-3 py-2 rounded items-center">
          <input
            type="checkbox"
            className="mr-3"
            checked={isChecked}
            onChange={handleCheckboxChange}
          />
          <form onSubmit={event => handleSubmit(event)} className="w-full">
            <input
              value={localTodo.text}
              onChange={handleChange}
              onBlur={handleBlur}
              onKeyDown={handleKeyDown}
              disabled={isSaving}
              autoFocus
              className={`w-full bg-transparent focus:outline-none ${isSaving &&
                "opacity-50"}`}
            />
          </form>
        </div>
      ) : (
        <button
          onClick={handleButtonClick}
          className="text-left w-full focus:shadow-outline focus:outline-none hover:bg-gray-200 px-3 py-2 rounded cursor-pointer flex items-center"
        >
          <input
            type="checkbox"
            className="mr-3"
            checked={isChecked}
            onChange={handleCheckboxChange}
            onClick={handleCheckboxClick}
          />
          <span>{todo.text}</span>
        </button>
      )}
    </div>
  );
}
