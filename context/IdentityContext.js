'use client'

import { createContext, useContext, useState, useEffect } from 'react'

const IdentityContext = createContext()

export function useIdentity() {
  return useContext(IdentityContext)
}

export function IdentityProvider({ children }) {
  const [identity, setIdentity] = useState('professional')
  const [isLoaded, setIsLoaded] = useState(false)

  // Load from localStorage on mount
  useEffect(() => {
    const savedIdentity = localStorage.getItem('nohustlecv-identity')
    if (savedIdentity) {
      setIdentity(savedIdentity)
    }
    setIsLoaded(true)
  }, [])

  // Save to localStorage when identity changes
  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem('nohustlecv-identity', identity)
    }
  }, [identity, isLoaded])

  const value = {
    identity,
    setIdentity,
    isLoaded
  }

  return (
    <IdentityContext.Provider value={value}>
      {children}
    </IdentityContext.Provider>
  )
}
