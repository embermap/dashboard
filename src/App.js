import React from "react";
import "./App.css";

function App() {
  let reloadApp = () => {
    window.location.reload();
  };

  return (
    <div className="px-8 flex bg-gray-900 w-screen h-screen flex flex-col">
      <header className="bg-gray-900 pt-16">
        <p className="text-gray-500 text-2xl uppercase">Top priority</p>
        <p className="text-white font-semibold text-4xl leading-snug">
          Ship ember-cli-mirage@1.1.0 that depends on @miragejs/server
        </p>
      </header>

      <div className="mt-16">
        <p className="text-gray-500 text-2xl uppercase">
          Week of June 3–7, 2019
        </p>
        <div className="flex mt-2">
          <div className="w-1/2">
            <p className="text-white font-bold text-2xl">Ryan</p>
            <ul className="text-white text-2xl">
              <li className="ml-4">– Video: How to use Ember CLI Clock</li>
              <li className="ml-4">– Ship Newsletters</li>
            </ul>
          </div>
          <div className="w-1/2">
            <p className="text-white font-bold text-2xl">Sam</p>
            <ul className="text-white text-2xl">
              <li className="ml-4">– N / A</li>
            </ul>
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

export default App;
