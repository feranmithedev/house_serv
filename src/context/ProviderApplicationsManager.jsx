import { useEffect, useState } from "react";
import ProviderApplicationsContext from "./ProviderApplicationsContext";

export function ProviderApplicationsManager({ children }) {
  const [applications, setApplications] = useState(() => {
    const storedApplications = localStorage.getItem("providerApplications");

    return storedApplications ? JSON.parse(storedApplications) : [];
  });

  useEffect(() => {
    localStorage.setItem("providerApplications", JSON.stringify(applications));
  }, [applications]);

  function addApplication(application) {
    const newApplication = {
      ...application,
      id: Date.now(),
      status: "Pending",
      submittedAt: new Date().toISOString(),
    };

    setApplications((current) => [newApplication, ...current]);

    return newApplication.id;
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
    <ProviderApplicationsContext.Provider
      value={{
        applications,
        addApplication,
        updateApplication,
      }}
    >
      {children}
    </ProviderApplicationsContext.Provider>
  );
}

export default ProviderApplicationsManager;
