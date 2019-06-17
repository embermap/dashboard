import { StoreContext } from "../app";
import { useState, useEffect, useContext, useCallback } from "react";

export function useFindAll(resourceName, { refresh } = {}) {
  let { data, fetched, updateCollection } = useContext(StoreContext);

  const fetchResource = useCallback(() => {
    fetch(`/api/${resourceName}s`)
      .then(response => response.json())
      .then(json => {
        updateCollection(resourceName, json);
      });
  }, [resourceName, updateCollection]);

  useEffect(() => {
    if (!fetched.has(resourceName)) {
      fetchResource();
    }
  }, [fetchResource, fetched, resourceName]);

  useEffect(() => {
    if (refresh) {
      let intervalId = setInterval(() => {
        fetchResource();
      }, refresh);

      return () => {
        clearInterval(intervalId);
      };
    }
  }, [fetchResource, refresh]);

  let collection = data[resourceName] || [];

  return [collection, { isLoading: !fetched.has(resourceName) }];
}

export function useCreate(resourceName) {
  let { addToCollection } = useContext(StoreContext);
  let [isSaving, setIsSaving] = useState(false);

  function create(resource) {
    setIsSaving(true);

    return new Promise((resolve, reject) => {
      fetch(`/api/${resourceName}s`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ [resourceName]: resource })
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

export function useResource(resourceName, id) {
  let [isSaving, setIsSaving] = useState(false);
  let { data, replaceResource, removeResource } = useContext(StoreContext);

  let resource = data[resourceName].find(resource => resource.id === id);

  function save(resource) {
    setIsSaving(true);

    return new Promise((resolve, reject) => {
      fetch(`/api/${resourceName}s/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ [resourceName]: resource })
      })
        .then(res => res.json())
        .then(json => {
          setIsSaving(false);
          replaceResource(resourceName, json);

          resolve(json);
        });
    });
  }

  function destroy() {
    return fetch(`/api/${resourceName}s/${id}`, {
      method: "DELETE"
    }).then(() => {
      removeResource(resourceName, id);
    });
  }

  return [resource, { save, isSaving, destroy }];
}

export function useSaveResources(resourceName) {
  let [isSaving, setIsSaving] = useState(false);
  let { replaceResource } = useContext(StoreContext);

  function save(resources) {
    setIsSaving(true);

    return new Promise((resolve, reject) => {
      fetch(`/api/${resourceName}s`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(resources)
      })
        .then(res => res.json())
        .then(todos => {
          todos.forEach(todo => {
            replaceResource(resourceName, todo);
          });

          resolve(todos);
        });
      setIsSaving(false);
    });
  }

  return { save, isSaving };
}
