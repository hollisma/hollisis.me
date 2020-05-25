import React from 'react'
import styled, { ThemeProvider } from 'styled-components'
import { GlobalStyles, Theme } from '../styles'
import { media } from '../styles'

import Navbar from './navbar'

// ${media.tablet`
// margin-top: 5em;
// padding-top: 2em;
// `}

const Container = styled.div`
  max-width: 800px;
  margin: 7.5em auto 7vh;
  ${media(900)`
    margin-top: 5em;
    width: 100%;
  `}
  padding: 2em 5vw;
  background-color: #afb;
  border-radius: 2vh;
  justify-self: center;
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
