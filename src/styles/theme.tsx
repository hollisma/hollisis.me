import { DefaultTheme } from 'styled-components'

export type ThemeShape = {
  colorScheme?: 'light' | 'dark'
  colors: {
    background: string
    surface: string
    text: string
    muted: string
    accent: string
    border: string
    /** Navbar translucent background */
    navbarBg?: string
  }
  spacing: {
    xs: string
    sm: string
    md: string
    lg: string
    xl: string
    xxl: string
  }
  radii: {
    sm: string
    md: string
    lg: string
    round: string
  }
  shadows: {
    sm: string
    md: string
    lg: string
  }
  breakpoints: {
    sm: string
    md: string
    lg: string
    xl: string
  }
}

export const lightTheme: ThemeShape = {
  colorScheme: 'light',
  colors: {
    background: '#f4f5f7',
    surface: '#ffffff',
    text: '#0f172a',
    muted: '#6b7280',
    accent: '#2563eb',
    border: '#e5e7eb',
    navbarBg: 'rgba(255, 255, 255, 0.85)',
  },
  spacing: {
    xs: '4px',
    sm: '8px',
    md: '16px',
    lg: '24px',
    xl: '32px',
    xxl: '48px',
  },
  radii: {
    sm: '6px',
    md: '10px',
    lg: '16px',
    round: '9999px',
  },
  shadows: {
    sm: '0 1px 2px rgba(0,0,0,0.05)',
    md: '0 4px 12px rgba(0,0,0,0.08)',
    lg: '0 8px 24px rgba(0,0,0,0.12)',
  },
  breakpoints: {
    sm: '480px',
    md: '768px',
    lg: '1024px',
    xl: '1440px',
  },
}

export const darkTheme: ThemeShape = {
  ...lightTheme,
  colorScheme: 'dark',
  colors: {
    background: '#0f172a',
    surface: '#1e293b',
    text: '#f1f5f9',
    muted: '#94a3b8',
    accent: '#60a5fa',
    border: '#334155',
    navbarBg: 'rgba(15, 23, 42, 0.9)',
  },
  shadows: {
    sm: '0 1px 2px rgba(0,0,0,0.3)',
    md: '0 4px 12px rgba(0,0,0,0.4)',
    lg: '0 8px 24px rgba(0,0,0,0.5)',
  },
}

const Theme = lightTheme
export default Theme
