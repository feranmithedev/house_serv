import { useContext } from "react";
import InspectionsContext from "./Inspections";

export function useInspections() {
  const context = useContext(InspectionsContext);

  if (!context) {
    throw new Error(
      "useInspections must be used within an InspectionsProvider"
    );
  }

  return context;
}