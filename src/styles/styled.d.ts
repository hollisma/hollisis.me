import {} from 'styled-components'
import theme from './theme'

declare module 'style-components' {
  type Theme = typeof theme
  export interface DefaultTheme extends Theme {}
}
