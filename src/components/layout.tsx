import React from 'react'
import { ThemeProvider } from 'styled-components'
import { GlobalStyles, Theme } from '../styles'

import Navbar from './navbar'

type LayoutProps = {
  children: React.ReactNode
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <ThemeProvider theme={Theme}>
      <GlobalStyles />
      <Navbar />
      {children}
    </ThemeProvider>
  )
}

export default Layout
