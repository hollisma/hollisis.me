import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { Link } from 'gatsby'

const StyledLink = styled(Link)`
  display: flex;
  position: relative;
  padding: 0 3vw;
  height: 100%;
  align-items: center;
  font-size: 1.25rem;
  text-decoration: none;
  color: blue;
  transition: all 0.2s ease;
  -webkit-filter: brightness(100%);
  &:hover {
    -webkit-filter: brightness(85%);
  }
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
  background-color: ${props => (props.scrolled ? '#fab' : '#abf')};
  align-items: center;
  transition: all 0.2s ease-out;
  ${StyledLink} {
    background-color: ${props => (props.scrolled ? '#fab' : '#abf')};
  }
`

const Navbar: React.FC = () => {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    window.onscroll = () => {
      setScrolled(document.documentElement.scrollTop > 1)
    }
  })

  return (
    <LinkContainer scrolled={scrolled}>
      <StyledLink to='/'>
        <p>Home</p>
      </StyledLink>
      <StyledLink to='/education'>
        <p>Education!</p>
      </StyledLink>
      <StyledLink to='/experience'>
        <p>Experience!</p>
      </StyledLink>
      <StyledLink to='/projects'>
        <p>Projects!</p>
      </StyledLink>
    </LinkContainer>
  )
}

export default Navbar
