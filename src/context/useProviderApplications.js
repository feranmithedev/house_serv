import { useContext } from "react";
import ProviderApplicationsContext from "./ProviderApplicationsContext";

export function useProviderApplications() {
  const context = useContext(ProviderApplicationsContext);

  if (!context) {
    throw new Error(
      "useProviderApplications must be used within ProviderApplicationsManager"
    );
  }

  return context;
}
