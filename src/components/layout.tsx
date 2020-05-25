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
  width: auto;
  max-width: 50em;
  margin: 7em auto 4em;
  ${media(900)`
    margin-top: 5em;
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
