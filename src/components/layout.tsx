import React from 'react'
import styled, { ThemeProvider } from 'styled-components'
import { GlobalStyles, media, Theme } from '../styles'
import Navbar from './navbar'

// ${media.tablet`
// margin-top: 5em;
// padding-top: 2em;
// `}

const Container = styled.div<{ size: string }>`
  width: auto;
  max-width: ${props => (props.size == 'large' ? '75em' : '50em')};
  margin: 7em auto 4em;
  ${props =>
    props.size == 'large' &&
    media(1440)`
      margin: 7em 5em 4em;
    `}
  ${media(900)`
    margin-top: 5em;
  `}
  padding: 3em 5vw;
  background-color: #afb;
  border-radius: 2vh;
  justify-self: center;
  font-family: Montserrat;
`

type LayoutProps = {
  children: React.ReactNode
  location: any
  size?: string
}

const Layout: React.FC<LayoutProps> = ({
  children,
  location,
  size = 'small',
}) => {
  return (
    <ThemeProvider theme={Theme}>
      <GlobalStyles />
      <Container size={size}>
        <Navbar location={location} />
        {children}
      </Container>
    </ThemeProvider>
  )
}

export default Layout
