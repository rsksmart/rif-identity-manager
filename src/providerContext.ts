import React from 'react'

export interface AppContextInterface {
  name: string
  setName: (value: string) => void
}

export const Context = React.createContext<AppContextInterface | null>(null)

export const AppContextProvider = Context.Provider
export const AppContextConsumer = Context.Consumer
