import { useEffect, useState } from "react";
import SavedProperties from "./SavedProperties.js";

export function SavedPropertiesProvider({ children }) {
  const [savedProperties, setSavedProperties] = useState(() => {
    const storedProperties = localStorage.getItem("savedProperties");

    return storedProperties ? JSON.parse(storedProperties) : [];
  });

  useEffect(() => {
    localStorage.setItem("savedProperties", JSON.stringify(savedProperties));
  }, [savedProperties]);

  function toggleSaved(propertyId) {
    setSavedProperties((current) =>
      current.includes(propertyId)
        ? current.filter((id) => id !== propertyId)
        : [...current, propertyId]
    );
  }

  function isSaved(propertyId) {
    return savedProperties.includes(propertyId);
  }

  return (
    <SavedProperties.Provider
      value={{ savedProperties, toggleSaved, isSaved }}
    >
      {children}
    </SavedProperties.Provider>
  );
}
