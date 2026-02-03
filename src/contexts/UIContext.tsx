"use client"

import React, { createContext, useContext, useState, useEffect } from 'react'

interface UIContextType {
    isZenMode: boolean;
    toggleZenMode: () => void;
}

const UIContext = createContext<UIContextType | undefined>(undefined)

export function UIProvider({ children }: { children: React.ReactNode }) {
    const [isZenMode, setIsZenMode] = useState(false)

    const toggleZenMode = () => {
        setIsZenMode(prev => !prev)
    }

    return (
        <UIContext.Provider value={{ isZenMode, toggleZenMode }}>
            {children}
        </UIContext.Provider>
    )
}

export function useUIContext() {
    const context = useContext(UIContext)
    if (context === undefined) {
        throw new Error('useUIContext must be used within a UIProvider')
    }
    return context
}
