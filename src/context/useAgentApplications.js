
import { useContext } from "react";
import AgentApplicationsContext from "./AgentApplications";

export function useAgentApplications() {
  const context = useContext(AgentApplicationsContext);

  if (!context) {
    throw new Error(
      "useAgentApplications must be used within AgentApplicationsProvider"
    );
  }

  return context;
}
