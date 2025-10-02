import { createGlobalStyle } from 'styled-components'

const GlobalStyles = createGlobalStyle`
  :root {
    color-scheme: light;
  }

  html {
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-rendering: optimizeLegibility;
  }

  body {
    margin: 0;
    padding: 0;
    background: ${({ theme }) => theme.colors.background};
    color: ${({ theme }) => theme.colors.text};
    font-family: 'Merriweather', Georgia, 'Times New Roman', serif;
    font-size: 18px;
    line-height: 1.75;
  }

  h1, h2, h3, h4, h5, h6 {
    margin: 0 0 0.5em 0;
    line-height: 1.25;
    font-family: 'Montserrat', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, 'Noto Sans', 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol', sans-serif;
    color: ${({ theme }) => theme.colors.text};
  }

  p { margin: 0 0 1em 0; }
  ul, ol { margin: 0 0 1em 1.25em; }
  li { margin: 0.25em 0; }

  a {
    color: ${({ theme }) => theme.colors.accent};
    text-decoration: none;
  }
  a:hover {
    text-decoration: underline;
  }

  ::selection {
    background: ${({ theme }) => theme.colors.accent};
    color: #fff;
  }
`

export default GlobalStyles
