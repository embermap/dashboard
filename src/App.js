import React, { useState } from "react";
import "./server";
import "./app.css";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Dashboard from "./pages/dashboard";
import Admin from "./pages/admin";

const StoreContext = React.createContext();

function App() {
  let [data, setData] = useState({});
  let [fetched, setFetched] = useState(new Set([]));

  function updateCollection(resourceName, collectionData) {
    setFetched(fetched.add(resourceName));
    setData({ ...data, [resourceName]: collectionData });
  }

  function addToCollection(resourceName, resourceData) {
    data[resourceName].push(resourceData);
    setData({ ...data });
  }

  let storeContextValue = {
    data,
    fetched,
    updateCollection,
    addToCollection
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
