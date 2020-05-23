import React from 'react'
import styled, { ThemeProvider } from 'styled-components'
import { GlobalStyles, Theme } from '../styles'

import Navbar from './navbar'

const Container = styled.div`
  margin: 15vh 7vw 7vh;
  padding: 10vh 10vw;
  background-color: #afb;
  border-radius: 2vh;
`

type LayoutProps = {
  children: React.ReactNode
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <ThemeProvider theme={Theme}>
      <GlobalStyles />
      <Container>
        <Navbar />
        {children}
      </Container>
    </ThemeProvider>
  )
}

export default Layout
