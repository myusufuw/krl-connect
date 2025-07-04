// eslint-disable-next-line import/order
import { createContext, Dispatch, SetStateAction, useContext } from 'react'

interface AppContextType {
  isSearchPanelExpanded: boolean
  setIsSearchPanelExpanded: Dispatch<SetStateAction<boolean>>
}

const AppContext = createContext<AppContextType | undefined>(undefined)

import { useState } from 'react'

const AppContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [isSearchPanelExpanded, setIsSearchPanelExpanded] =
    useState<boolean>(true)

  return (
    <AppContext.Provider
      value={{ isSearchPanelExpanded, setIsSearchPanelExpanded }}
    >
      {children}
    </AppContext.Provider>
  )
}

export const useAppContext = () => {
  const context = useContext(AppContext)

  if (!context) {
    throw new Error('useAppContext must be used within an AppContextProvider')
  }

  return context
}

export { AppContext, AppContextProvider }
