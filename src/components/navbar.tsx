import React, { useState, useEffect } from 'react'
import styled, { css } from 'styled-components'
import { Link } from 'gatsby'
import { navLinks } from '../config'
import { ThemeToggle } from './ThemeToggle'

const StyledLink = styled(Link)<{ current: string }>`
  display: flex;
  position: relative;
  padding: 0 1rem;
  height: 100%;
  align-items: center;
  font-size: 1em;
  text-decoration: none;
  color: ${({ theme }) => theme.colors.text};
  transition:
    color 0.15s ease,
    opacity 0.2s ease;
  background: transparent;
  ${props =>
    props.current === 'true'
      ? css`
          color: ${props => props.theme.colors.accent};
          &:after {
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
  p {
    margin: 0;
  }
`

const LinkContainer = styled.nav<{ scrolled: boolean }>`
  display: flex;
  position: fixed;
  top: 0;
  left: 0;
  height: ${props => (props.scrolled ? '56px' : '72px')};
  width: 100%;
  z-index: 10;
  background: ${({ theme }) => theme.colors.navbarBg ?? theme.colors.surface};
  backdrop-filter: saturate(180%)
    blur(${props => (props.scrolled ? '10px' : '8px')});
  -webkit-backdrop-filter: saturate(180%)
    blur(${props => (props.scrolled ? '10px' : '8px')});
  border-bottom: ${props => (props.scrolled ? '1px' : '2px')} solid
    ${({ theme }) => theme.colors.border};
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease-out;
  font-weight: 600;
`

const DesktopLinks = styled.div`
  display: flex;
  height: 100%;
  @media (max-width: 40em) {
    display: none;
  }
`

const HamburgerBtn = styled.button`
  display: none;
  position: absolute;
  left: 1.25rem;
  top: 50%;
  transform: translateY(-50%);
  background: none;
  border: none;
  cursor: pointer;
  color: ${({ theme }) => theme.colors.text};
  padding: 0.4rem 0.5rem;
  font-size: 1.35rem;
  line-height: 1;
  @media (max-width: 40em) {
    display: flex;
    align-items: center;
    justify-content: center;
  }
`

const MobileMenu = styled.div<{ open: boolean; scrolled: boolean }>`
  display: none;
  @media (max-width: 40em) {
    display: flex;
    flex-direction: column;
    position: fixed;
    top: ${({ scrolled }) => (scrolled ? '56px' : '72px')};
    left: 0;
    right: 0;
    background: ${({ theme }) => theme.colors.navbarBg ?? theme.colors.surface};
    backdrop-filter: saturate(180%) blur(12px);
    -webkit-backdrop-filter: saturate(180%) blur(12px);
    border-bottom: 1px solid ${({ theme }) => theme.colors.border};
    z-index: 9;
    opacity: ${({ open }) => (open ? 1 : 0)};
    transform: translateY(${({ open }) => (open ? '0' : '-10px')});
    pointer-events: ${({ open }) => (open ? 'auto' : 'none')};
    transition:
      opacity 0.2s ease-out,
      transform 0.2s ease-out,
      top 0.2s ease-out;
  }
`

const MobileLink = styled(Link)<{ current: string }>`
  display: block;
  padding: 0.85rem 1.5rem;
  font-size: 1em;
  font-weight: 600;
  text-decoration: none;
  color: ${({ theme, current }) =>
    current === 'true' ? theme.colors.accent : theme.colors.text};
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
  &:last-of-type {
    border-bottom: none;
  }
  &:hover {
    opacity: 0.7;
    text-decoration: none;
  }
`

const ToggleWrap = styled.div`
  position: absolute;
  right: 1.25rem;
  top: 50%;
  transform: translateY(-50%);
`

const Navbar = ({ location }: any) => {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    window.onscroll = () => {
      setScrolled(document.documentElement.scrollTop > 1)
    }
  })

  const pathname = location && location.pathname

  return (
    <>
      <LinkContainer scrolled={scrolled}>
        <HamburgerBtn
          onClick={() => setMenuOpen(o => !o)}
          aria-label='Toggle menu'
          aria-expanded={menuOpen}
        >
          {menuOpen ? '✕' : '☰'}
        </HamburgerBtn>
        <DesktopLinks>
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
        </DesktopLinks>
        <ToggleWrap>
          <ThemeToggle />
        </ToggleWrap>
      </LinkContainer>
      <MobileMenu open={menuOpen} scrolled={scrolled}>
        {navLinks.map(({ name, url }) => {
          const urlSub = url.split('/')[1]
          const pathSub = pathname && pathname.split('/')[1]
          return (
            <MobileLink
              to={url}
              key={name}
              current={(urlSub === pathSub).toString()}
              onClick={() => setMenuOpen(false)}
            >
              {name}
            </MobileLink>
          )
        })}
      </MobileMenu>
    </>
  )
}

export default Navbar
