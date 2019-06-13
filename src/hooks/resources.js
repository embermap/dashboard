import { StoreContext } from "../app";
import { useState, useEffect, useContext } from "react";

export function useFindAll(resourceName) {
  const { data, fetched, updateCollection } = useContext(StoreContext);

  useEffect(() => {
    if (!fetched.has(resourceName)) {
      fetch(`/api/${resourceName}s`)
        .then(response => response.json())
        .then(json => {
          updateCollection(resourceName, json);
        });
    }
  }, [resourceName, fetched, updateCollection]);

  let collection = data[resourceName] || [];

  return [collection, { isLoading: !fetched.has(resourceName) }];
}

export function useCreate(resourceName) {
  const { addToCollection } = useContext(StoreContext);
  let [isSaving, setIsSaving] = useState(false);

  function create(todo) {
    setIsSaving(true);

    return new Promise((resolve, reject) => {
      fetch(`/api/${resourceName}s`, {
        method: "POST",
        body: JSON.stringify({ todo })
      })
        .then(response => response.json())
        .then(json => {
          setIsSaving(false);
          addToCollection(resourceName, json);

          resolve(json);
        });
    });
  }

  return [create, { isSaving }];
}
