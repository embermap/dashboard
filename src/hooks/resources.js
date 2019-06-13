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
        body: JSON.stringify({ resource })
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
  let { data, replaceResource } = useContext(StoreContext);

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

  return [resource, { save, isSaving }];
}
