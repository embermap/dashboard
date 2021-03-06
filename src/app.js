import React, { useState } from "react";
import startServer from "./start-server";
import "./app.css";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Dashboard from "./pages/dashboard";
import Admin from "./pages/admin";

const StoreContext = React.createContext();

function App() {
  if (process.env.REACT_APP_MIRAGE_ENABLED) {
    startServer();
  }

  let [data, setData] = useState({});
  let [fetched, setFetched] = useState(new Set([]));

  function updateCollection(resourceName, resourceData) {
    setFetched(fetched.add(resourceName));
    setData({ ...data, [resourceName]: resourceData });
  }

  function addToCollection(resourceName, resourceData) {
    data[resourceName].push(resourceData);
    setData({ ...data });
  }

  function replaceResource(resourceName, resourceData) {
    let rest = data[resourceName].filter(
      resource => resource.id !== resourceData.id
    );
    data[resourceName] = [...rest, resourceData];
    setData({ ...data });
  }

  function removeResource(resourceName, id) {
    let rest = data[resourceName].filter(resource => resource.id !== id);
    data[resourceName] = [...rest];
    setData({ ...data });
  }

  let storeContextValue = {
    data,
    fetched,
    updateCollection,
    addToCollection,
    replaceResource,
    removeResource
  };

  return (
    <StoreContext.Provider value={storeContextValue}>
      <Router>
        <div>
          <Route path="/" exact component={Dashboard} />
          <Route path="/admin/" component={Admin} />
        </div>
      </Router>
    </StoreContext.Provider>
  );
}

export default App;
export { StoreContext };
