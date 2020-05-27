import React, { useState, useEffect } from 'react'
import styled, { css } from 'styled-components'
import { Link } from 'gatsby'
import { navLinks } from '../config'

const StyledLink = styled(Link)<{ current: boolean }>`
  display: flex;
  position: relative;
  padding: 0 3vw;
  height: 100%;
  align-items: center;
  font-size: 1.25rem;
  text-decoration: none;
  color: blue;
  transition: all 0.2s ease;
  background-color: #abf;
  ${props =>
    props.current
      ? css`
          background: #8a97c9 !important;
          color: #00b;
        `
      : css`
          &:hover {
            -webkit-filter: brightness(90%);
          }
        `}
  p {
    margin: 0;
  }
`

const LinkContainer = styled.div<{ scrolled: boolean }>`
  display: flex;
  position: fixed;
  top: 0;
  left: 0;
  height: ${props => (props.scrolled ? '3.5em' : '4.5em')};
  width: 100%;
  background-color: #abf;
  align-items: center;
  transition: all 0.2s ease-out;
`

const Navbar = ({ location }: any) => {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    window.onscroll = () => {
      setScrolled(document.documentElement.scrollTop > 1)
    }
  })

  const current = location.pathname.split('/')[1]

  return (
    <LinkContainer scrolled={scrolled}>
      {navLinks.map(({ name, url }) => (
        <StyledLink
          to={url}
          key={name}
          current={name.toLowerCase() === current}
        >
          <p>{name}</p>
        </StyledLink>
      ))}
    </LinkContainer>
  )
}

export default Navbar
