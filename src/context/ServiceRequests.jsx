import { useEffect, useState } from 'react'
import ServiceRequests from './ServiceRequests.js'

export function ServiceRequestsProvider({ children }) {
  const [serviceRequests, setServiceRequests] = useState(() => {
    const storedRequests = localStorage.getItem('serviceRequests')

    return storedRequests ? JSON.parse(storedRequests) : []
  })

  useEffect(() => {
    localStorage.setItem(
      'serviceRequests',
      JSON.stringify(serviceRequests)
    )
  }, [serviceRequests])

  function addServiceRequest(request) {
    const newRequest = {
      id: Date.now(),
      ...request,
      status: 'Pending',
      createdAt: new Date().toISOString(),
    }

    setServiceRequests((current) => [
      newRequest,
      ...current,
    ])
  }

  return (
    <ServiceRequests.Provider
      value={{ serviceRequests, addServiceRequest }}
    >
      {children}
    </ServiceRequests.Provider>
  )
}

export default ServiceRequestsProvider