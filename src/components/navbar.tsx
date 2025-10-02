import React, { useState, useEffect } from 'react'
import styled, { css } from 'styled-components'
import { Link } from 'gatsby'
import { navLinks } from '../config'

const StyledLink = styled(Link)<{ current: string }>`
  display: flex;
  position: relative;
  padding: 0 1rem;
  height: 100%;
  align-items: center;
  font-size: 1em;
  text-decoration: none;
  color: ${({ theme }) => theme.colors.text};
  transition: color 0.15s ease, opacity 0.2s ease;
  background: transparent;
  ${props =>
    props.current === 'true'
      ? css`
          color: ${props => props.theme.colors.accent};
          &:after { // Bar below active navbar section
            content: '';
            position: absolute;
            left: 1rem;
            right: 1rem;
            bottom: 10px;
            height: 2px;
            background: ${props => props.theme.colors.accent};
            border-radius: 1px;
          }
        `
      : css`
          &:hover {
            opacity: 0.6;
          }
        `}
  p { margin: 0; }
`

const LinkContainer = styled.div<{ scrolled: boolean }>`
  display: flex;
  position: fixed;
  top: 0;
  left: 0;
  height: ${props => (props.scrolled ? '56px' : '72px')};
  width: 100%;
  z-index: 10;
  background: rgba(255, 255, 255, ${props => (props.scrolled ? 0.8 : 0.6)});
  backdrop-filter: saturate(180%) blur(${props => (props.scrolled ? '10px' : '8px')});
  -webkit-backdrop-filter: saturate(180%) blur(${props => (props.scrolled ? '10px' : '8px')});
  border-bottom: ${props => (props.scrolled ? '1px' : '2px')} solid ${({ theme }) => theme.colors.border};
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease-out;
  font-weight: 600;
`

const Navbar = ({ location }: any) => {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    window.onscroll = () => {
      setScrolled(document.documentElement.scrollTop > 1)
    }
  })

  const pathname = location && location.pathname

  return (
    <LinkContainer scrolled={scrolled}>
      {navLinks.map(({ name, url }) => {
        const urlSub = url.split('/')[1]
        const pathSub = pathname && pathname.split('/')[1]

        return (
          <StyledLink
            to={url}
            key={name}
            current={(urlSub === pathSub).toString()}
          >
            <p>{name}</p>
          </StyledLink>
        )
      })}
    </LinkContainer>
  )
}

export default Navbar
