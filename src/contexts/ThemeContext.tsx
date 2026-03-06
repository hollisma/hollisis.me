import React, { createContext, useContext, useState, useEffect, useLayoutEffect, useMemo } from 'react'
import { lightTheme, darkTheme } from '../styles/theme'
import type { ThemeShape } from '../styles/theme'

const STORAGE_KEY = 'hollisis-theme'

export type ThemeMode = 'light' | 'dark'

type ThemeContextValue = {
  mode: ThemeMode
  theme: ThemeShape
  /** True after we've read theme from storage/DOM so we can show UI without flicker */
  resolved: boolean
  setMode: (mode: ThemeMode) => void
  toggleTheme: () => void
}

const ThemeContext = createContext<ThemeContextValue | null>(null)

function getInitialMode(): ThemeMode {
  if (typeof window === 'undefined') return 'light'
  const stored = localStorage.getItem(STORAGE_KEY) as ThemeMode | null
  if (stored === 'light' || stored === 'dark') return stored
  if (window.matchMedia?.('(prefers-color-scheme: dark)').matches) return 'dark'
  return 'light'
}

/** Sync with anti-flicker script: read data-theme set by gatsby-ssr script */
function getThemeFromDOM(): ThemeMode | null {
  if (typeof document === 'undefined') return null
  const t = document.documentElement.getAttribute('data-theme')
  return t === 'dark' ? 'dark' : t === 'light' ? 'light' : null
}

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [mode, setModeState] = useState<ThemeMode>('light')
  const [resolved, setResolved] = useState(false)
  const [mounted, setMounted] = useState(false)

  useLayoutEffect(() => {
    const next = getThemeFromDOM() ?? getInitialMode()
    setModeState(next)
    setResolved(true)
    setMounted(true)
  }, [])

  useEffect(() => {
    if (!mounted) return
    localStorage.setItem(STORAGE_KEY, mode)
    document.documentElement.setAttribute('data-theme', mode)
    document.documentElement.style.colorScheme = mode
    // Remove anti-flicker style when switching to light so it doesn't override theme
    if (mode === 'light') {
      const style = document.getElementById('gatsby-anti-flicker')
      if (style) style.remove()
    }
  }, [mode, mounted])

  const value = useMemo<ThemeContextValue>(
    () => ({
      mode,
      theme: mode === 'dark' ? darkTheme : lightTheme,
      resolved,
      setMode: setModeState,
      toggleTheme: () => setModeState((m) => (m === 'light' ? 'dark' : 'light')),
    }),
    [mode, resolved]
  )

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
}

export function useTheme() {
  const ctx = useContext(ThemeContext)
  if (!ctx) throw new Error('useTheme must be used within ThemeProvider')
  return ctx
}
