import { useEffect, useState } from "react";
import PropertiesContext from "./Properties";

export function PropertiesProvider({ children }) {
  const [agentProperties, setAgentProperties] = useState(() => {
    const storedProperties = localStorage.getItem("agentProperties");

    return storedProperties ? JSON.parse(storedProperties) : [];
  });

  useEffect(() => {
    localStorage.setItem("agentProperties", JSON.stringify(agentProperties));
  }, [agentProperties]);

  function addProperty(property, listingStatus = "Draft") {
    const newProperty = {
      id: Date.now(),
      ...property,
      listingStatus,
      createdAt: new Date().toISOString(),
    };

    setAgentProperties((current) => [newProperty, ...current]);
  }

  function updateProperty(propertyId, updatedData) {
    setAgentProperties((current) =>
      current.map((property) =>
        property.id === propertyId ? { ...property, ...updatedData } : property
      )
    );
  }

  function deleteProperty(propertyId) {
    setAgentProperties((current) =>
      current.filter((property) => property.id !== propertyId)
    );
  }

  return (
    <PropertiesContext.Provider
      value={{
        agentProperties,
        addProperty,
        updateProperty,
        deleteProperty,
      }}
    >
      {children}
    </PropertiesContext.Provider>
  );
}

export default PropertiesProvider;
