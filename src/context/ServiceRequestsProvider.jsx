import { useEffect, useState } from "react";
import ServiceRequestsContext from "./ServiceRequests";

export function ServiceRequestsProvider({ children }) {
  const [serviceRequests, setServiceRequests] = useState(() => {
    const storedRequests = localStorage.getItem("serviceRequests");

    return storedRequests ? JSON.parse(storedRequests) : [];
  });

  useEffect(() => {
    localStorage.setItem("serviceRequests", JSON.stringify(serviceRequests));
  }, [serviceRequests]);

  function addServiceRequest(request) {
    const newRequest = {
      id: Date.now(),
      ...request,
      status: "Pending",
      createdAt: new Date().toISOString(),
    };

    setServiceRequests((current) => [newRequest, ...current]);
  }

  function updateServiceRequestStatus(requestId, newStatus) {
    setServiceRequests((current) =>
      current.map((request) =>
        request.id === requestId ? { ...request, status: newStatus } : request
      )
    );
  }

  return (
    <ServiceRequestsContext.Provider
      value={{
        serviceRequests,
        addServiceRequest,
        updateServiceRequestStatus,
      }}
    >
      {children}
    </ServiceRequestsContext.Provider>
  );
}
