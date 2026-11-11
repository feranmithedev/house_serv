import { useEffect, useState } from "react";
import AgentApplicationsContext from "./AgentApplications";

export function AgentApplicationsProvider({ children }) {
  const [applications, setApplications] = useState(() => {
    const storedApplications = localStorage.getItem("agentApplications");

    return storedApplications ? JSON.parse(storedApplications) : [];
  });

  useEffect(() => {
    localStorage.setItem("agentApplications", JSON.stringify(applications));
  }, [applications]);

  function addApplication(application) {
    const newApplication = {
      id: Date.now(),
      ...application,
      status: "Pending",
      submittedAt: new Date().toISOString(),
    };

    setApplications((current) => [newApplication, ...current]);
  }

  function updateApplication(applicationId, updatedData) {
    setApplications((current) =>
      current.map((application) =>
        application.id === applicationId
          ? { ...application, ...updatedData }
          : application
      )
    );
  }

  return (
    <AgentApplicationsContext.Provider
      value={{
        applications,
        addApplication,
        updateApplication,
      }}
    >
      {children}
    </AgentApplicationsContext.Provider>
  );
}

export default AgentApplicationsProvider;
