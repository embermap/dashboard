import React from "react";
import Spinner from "../components/spinner";
import { useFindAll } from "../hooks/resources";

export default function() {
  let reloadApp = () => {
    window.location.reload();
  };

  let [todos, { isLoading }] = useFindAll("todo", { refresh: 2000 });

  let samsTodos = todos
    .filter(todo => todo.author === "Sam")
    .sort((a, b) => a.position - b.position);
  let ryansTodos = todos
    .filter(todo => todo.author === "Ryan")
    .sort((a, b) => a.position - b.position);

  return (
    <div className="px-8 flex bg-gray-900 w-screen h-screen flex flex-col">
      <header className="bg-gray-900 pt-16">
        <p className="text-gray-500 text-2xl uppercase">Top priority</p>
        <p className="text-white font-semibold text-4xl leading-snug">
          What are you going to send to Mirage.js subscribers?
        </p>
      </header>

      <div className="mt-16">
        <p className="text-gray-500 text-2xl uppercase">This week</p>
        <div className="flex mt-2">
          <div className="w-1/2">
            <TodoList name="Ryan" todos={ryansTodos} isLoading={isLoading} />
          </div>
          <div className="w-1/2">
            <TodoList name="Sam" todos={samsTodos} isLoading={isLoading} />
          </div>
        </div>
      </div>

      <main className="flex-1 pt-16">
        <p className="text-gray-500 text-2xl uppercase">Projects</p>
        <div className="mt-3">
          <Project name="ember-cli-mirage" />
        </div>
      </main>

      <div className="text-right pb-6">
        <button
          onClick={reloadApp}
          className="bg-gray-700 text-2xl font-semibold text-gray-200 px-8 py-4 rounded"
        >
          Reload
        </button>
      </div>
    </div>
  );
}

function TodoList({ name, todos, isLoading }) {
  return (
    <>
      <p className="text-white font-bold text-2xl flex items-center">
        {name}
        {isLoading && <Spinner />}
      </p>
      <ul className="text-white text-2xl h-40 overflow-y-hidden relative">
        {todos.map(todo => (
          <li className="ml-4" key={todo.id}>
            – {todo.text}
          </li>
        ))}
        <div
          className="absolute bottom-0 inset-x-0 h-16"
          style={{
            backgroundImage:
              "linear-gradient(rgba(26,32,44,0), rgba(26,32,44,1))"
          }}
        />
      </ul>
    </>
  );
}

function Project({ name }) {
  return (
    <div
      className="border-t-12 border-gray-600 bg-gray-800
      text-white w-full h-auto px-8 py-4 shadow-2xl rounded-lg"
    >
      <p className="font-semibold text-3xl text-white">{name}</p>

      <div className="text-xl mt-6 flex-1 flex flex-wrap">
        <Stat title="Untriaged issues" value={28} />
        <Stat title="Bugs" value={400} />
        <Stat title="Dependabot PRs" value={3} />
        <Stat title="NPM downloads" value={"40k"} />
      </div>
    </div>
  );
}

function Stat({ title = "Stat", value = 5 }) {
  return (
    <div className="w-1/4 h-1/2 uppercase leading-none flex flex-col justify-center">
      <p className="text-6xl font-semibold text-white">{value}</p>
      <p className="text-xl pt-2 font-semibold text-gray-600">{title}</p>
    </div>
  );
}
