import styled from 'styled-components'

const Prose = styled.div`
  font-size: 1.05em;
  line-height: 1.8;
  color: ${({ theme }) => theme.colors.text};

  p {
    margin: 1em 0;
  }
  ul,
  ol {
    margin: 0.75em 0 1.25em 1.25em;
  }
  li {
    margin: 0.4em 0;
  }

  a {
    color: ${({ theme }) => theme.colors.accent};
    text-decoration: none;
  }
  a:hover {
    text-decoration: underline;
  }

  img {
    max-width: 100%;
    height: auto;
    border-radius: 0.75em;
  }

  blockquote {
    margin: 1.25em 0;
    padding: 0.75em 1em;
    border-left: 3px solid ${({ theme }) => theme.colors.border};
    color: ${({ theme }) => theme.colors.muted};
    background: ${({ theme }) => theme.colors.surface};
  }

  code,
  pre {
    font-family:
      ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono',
      'Courier New', monospace;
  }
  pre {
    background: ${({ theme }) => theme.colors.surface};
    border: 1px solid ${({ theme }) => theme.colors.border};
    border-radius: 8px;
    padding: 12px 14px;
    overflow: auto;
  }
  code {
    background: ${({ theme }) => theme.colors.surface};
    border: 1px solid ${({ theme }) => theme.colors.border};
    border-radius: 6px;
    padding: 0.1em 0.35em;
  }
`

export default Prose
