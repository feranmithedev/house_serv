import { useEffect, useState } from "react";
import InspectionsContext from "./Inspections";

export function InspectionsProvider({ children }) {
  const [inspections, setInspections] = useState(() => {
    const storedInspections = localStorage.getItem("inspections");

    return storedInspections ? JSON.parse(storedInspections) : [];
  });

  useEffect(() => {
    localStorage.setItem("inspections", JSON.stringify(inspections));
  }, [inspections]);

  function addInspection(inspection) {
    const newInspection = {
      id: Date.now(),
      ...inspection,
      status: "Pending",
      createdAt: new Date().toISOString(),
    };

    setInspections((current) => [newInspection, ...current]);
  }

  function acceptInspection(inspectionId) {
    setInspections((current) =>
      current.map((inspection) =>
        inspection.id === inspectionId && inspection.status === "Pending"
          ? { ...inspection, status: "Accepted" }
          : inspection
      )
    );
  }

  function declineInspection(inspectionId) {
    setInspections((current) =>
      current.map((inspection) =>
        inspection.id === inspectionId && inspection.status === "Pending"
          ? { ...inspection, status: "Declined" }
          : inspection
      )
    );
  }

  function cancelInspection(inspectionId) {
    setInspections((current) =>
      current.map((inspection) =>
        inspection.id === inspectionId
          ? { ...inspection, status: "Cancelled" }
          : inspection
      )
    );
  }

  function completeInspection(inspectionId) {
    setInspections((current) =>
      current.map((inspection) =>
        inspection.id === inspectionId
          ? { ...inspection, status: "Completed" }
          : inspection
      )
    );
  }

  return (
    <InspectionsContext.Provider
      value={{
        inspections,
        addInspection,
        acceptInspection,
        declineInspection,
        cancelInspection,
        completeInspection,
      }}
    >
      {children}
    </InspectionsContext.Provider>
  );
}

export default InspectionsProvider;
