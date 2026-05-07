import React from 'react'
import styled, { keyframes } from 'styled-components'
import { useTheme } from '../contexts/ThemeContext'

const slideIn = keyframes`
  from { transform: scale(0.8); opacity: 0; }
  to { transform: scale(1); opacity: 1; }
`

const Track = styled.button<{ $isDark: boolean }>`
  position: relative;
  width: 56px;
  height: 28px;
  border-radius: 999px;
  border: 2px solid
    ${({ theme, $isDark }) =>
      $isDark ? theme.colors.muted : theme.colors.border};
  background: ${({ theme }) => theme.colors.surface};
  cursor: pointer;
  padding: 0;
  display: flex;
  align-items: center;
  transition:
    border-color 0.25s ease,
    background 0.25s ease;
  overflow: hidden;

  &:hover {
    border-color: ${({ theme, $isDark }) =>
      $isDark
        ? `color-mix(in srgb, ${theme.colors.muted} 50%, ${theme.colors.text} 50%)`
        : `color-mix(in srgb, ${theme.colors.border} 60%, ${theme.colors.muted} 40%)`};
  }
  &:focus-visible {
    outline: 2px solid
      ${({ theme, $isDark }) =>
        $isDark
          ? `color-mix(in srgb, ${theme.colors.muted} 50%, ${theme.colors.text} 50%)`
          : `color-mix(in srgb, ${theme.colors.border} 60%, ${theme.colors.muted} 40%)`};
    outline-offset: 2px;
  }
`

const Thumb = styled.span<{ $isDark: boolean }>`
  position: absolute;
  left: ${({ $isDark }) => ($isDark ? '29px' : '1px')};
  top: 1px;
  width: 22px;
  height: 22px;
  border-radius: 50%;
  background: ${({ $isDark }) => ($isDark ? '#cbd5e1' : '#fef08a')};
  display: flex;
  align-items: center;
  justify-content: center;
  transition:
    left 0.35s cubic-bezier(0.4, 0, 0.2, 1),
    transform 0.2s ease,
    background 0.2s ease;
  box-shadow: ${({ theme }) => theme.shadows.sm};
  ${Track}:hover & {
    transform: scale(1.05);
  }
`

const IconWrap = styled.span<{ $dark?: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${({ $dark }) => ($dark ? '#1e293b' : 'inherit')};
  animation: ${slideIn} 0.3s ease;
  line-height: 0;
  /* Nudge icon up so it's vertically centered in the toggle track */
  position: relative;
  top: -1px;
  & svg {
    display: block;
    vertical-align: middle;
  }
`

function SunIcon({ size = 14 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox='0 0 24 24'
      fill='none'
      strokeLinecap='round'
      strokeLinejoin='round'
      aria-hidden
      style={{ overflow: 'visible' }}
    >
      {/* Center disc - warm yellow */}
      <circle
        cx='12'
        cy='12'
        r='4'
        fill='#fbbf24'
        stroke='#f59e0b'
        strokeWidth='1.5'
      />
      {/* Rays - orange */}
      <path
        d='M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41'
        stroke='#ea580c'
        strokeWidth='2'
      />
    </svg>
  )
}

function MoonIcon({ size = 14 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox='0 0 24 24'
      fill='none'
      stroke='currentColor'
      strokeWidth='2'
      strokeLinecap='round'
      strokeLinejoin='round'
      aria-hidden
    >
      <path d='M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z' />
    </svg>
  )
}

export function ThemeToggle() {
  const { mode, toggleTheme } = useTheme()
  const isDark = mode === 'dark'

  return (
    <Track
      type='button'
      onClick={toggleTheme}
      $isDark={isDark}
      aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
      title={isDark ? 'Light mode' : 'Dark mode'}
    >
      <Thumb $isDark={isDark}>
        {isDark ? (
          <IconWrap $dark>
            <MoonIcon />
          </IconWrap>
        ) : (
          <IconWrap>
            <SunIcon />
          </IconWrap>
        )}
      </Thumb>
    </Track>
  )
}
