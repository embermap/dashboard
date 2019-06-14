import { StoreContext } from "../app";
import { useState, useEffect, useContext } from "react";

export function useFindAll(resourceName) {
  let { data, fetched, updateCollection } = useContext(StoreContext);

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
  let { addToCollection } = useContext(StoreContext);
  let [isSaving, setIsSaving] = useState(false);

  function create(resource) {
    setIsSaving(true);

    return new Promise((resolve, reject) => {
      fetch(`/api/${resourceName}s`, {
        method: "POST",
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

    return Promise.all(
      resources.map(resource => {
        return new Promise((resolve, reject) => {
          fetch(`/api/${resourceName}s/${resource.id}`, {
            method: "PATCH",
            body: JSON.stringify({ [resourceName]: resource })
          })
            .then(res => res.json())
            .then(json => {
              replaceResource(resourceName, json);

              resolve(json);
            });
        });
      })
    ).then(() => {
      setIsSaving(false);
    });
  }

  return { save, isSaving };
}
