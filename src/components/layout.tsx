import React from 'react'
import styled, { ThemeProvider } from 'styled-components'
import { GlobalStyles, media, Theme } from '../styles'
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
  font-family: Montserrat;
`

type LayoutProps = {
  children: React.ReactNode
  location: any
}

const Layout: React.FC<LayoutProps> = ({ children, location }) => {
  return (
    <ThemeProvider theme={Theme}>
      <GlobalStyles />
      <Container>
        <Navbar location={location} />
        {children}
      </Container>
    </ThemeProvider>
  )
}

export default Layout
