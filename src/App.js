import React from "react";
import "./App.css";

function Stat({ title = "Stat", value = 5 }) {
  return (
    <div className="w-1/2 h-1/2 uppercase leading-none flex flex-col justify-center">
      <p className="text-6xl font-semibold text-white">{value}</p>
      <p className="text-xl pt-2 font-semibold text-gray-600">{title}</p>
    </div>
  );
}

function Project({ name }) {
  return (
    <div className="border-t-12 border-gray-600 bg-gray-800 text-white w-1/2 h-1/2 px-8 py-4 shadow-2xl rounded-lg flex flex-col">
      <p className="font-semibold text-3xl text-white">{name}</p>
      <div />

      <div className="text-xl mt-3 flex-1 flex flex-wrap">
        <Stat title="Untriaged issues" value={28} />
        <Stat title="Bugs" value={400} />
        <Stat title="Dependabot PRs" value={3} />
        <Stat title="NPM downloads" value={"40k"} />
      </div>
    </div>
  );
}

function App() {
  return (
    <div className="flex bg-gray-900 w-screen h-screen flex flex-col">
      <header className="bg-gray-800 text-gray-600 px-8 py-4 text-3xl">
        EmberMap Dashboard
      </header>
      <main className="flex-1 p-16 flex items-center justify-center">
        <Project name="ember-cli-mirage" />
      </main>
    </div>
  );
}

export default App;
