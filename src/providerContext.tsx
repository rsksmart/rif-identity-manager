import React, { useState } from 'react'

export interface Web3ProviderContextInterface {
  provider: any | null,
  setProvider: (value: any) => void,
}

export const Web3ProviderContext = React.createContext<Web3ProviderContextInterface | null>(null)

interface Web3ProviderElementInterface {
  children: React.ReactNode,
}

export const Web3ProviderElement: React.FC<Web3ProviderElementInterface> = ({ children }) => {
  const [provider, setProvider] = useState<any | null>(null)
  const initialContext: Web3ProviderContextInterface = {
    provider: provider,
    setProvider: (provider: any) => setProvider(provider)
  }

  return (
    <Web3ProviderContext.Provider value={initialContext}>
      {children}
    </Web3ProviderContext.Provider>
  )
}
