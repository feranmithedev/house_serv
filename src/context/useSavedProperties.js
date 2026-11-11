import { useContext } from "react";
import SavedProperties from "./SavedProperties.js";

export function useSavedProperties() {
  return useContext(SavedProperties);
}