import React from 'react'
import styled, { ThemeProvider } from 'styled-components'
import { GlobalStyles, media } from '../styles'
import { useTheme } from '../contexts/ThemeContext'
import Navbar from './navbar'

const Container = styled.div<{ size: string }>`
  width: auto;
  max-width: ${props => (props.size == 'large' ? '80ch' : '72ch')};
  margin: 6em auto 4em;
  ${props =>
    props.size == 'large' &&
    media(1440)`
      margin: 6em 5em 4em;
    `}
  ${media(900)`
    margin-top: 4.5em;
  `}
  padding: 0 5vw 3em;
  justify-self: center;
`

const ContentWrap = styled.div<{ $visible: boolean }>`
  opacity: ${({ $visible }) => ($visible ? 1 : 0)};
  transition: opacity 0.15s ease-out;
`

type LayoutProps = {
  children: React.ReactNode
  location: any
  size?: string
}

function LayoutInner({
  children,
  location,
  size,
}: {
  children: React.ReactNode
  location: any
  size: string
}) {
  const { theme, resolved } = useTheme()
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <ContentWrap $visible={resolved}>
        <Container size={size}>
          <Navbar location={location} />
          {children}
        </Container>
      </ContentWrap>
    </ThemeProvider>
  )
}

const Layout: React.FC<LayoutProps> = ({
  children,
  location,
  size = 'small',
}) => {
  return (
    <LayoutInner location={location} size={size}>
      {children}
    </LayoutInner>
  )
}

export default Layout
