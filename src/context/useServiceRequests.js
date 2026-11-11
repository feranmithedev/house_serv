import { useContext } from 'react'
import ServiceRequests from './ServiceRequests.js'

export function useServiceRequests() {
  return useContext(ServiceRequests)
}