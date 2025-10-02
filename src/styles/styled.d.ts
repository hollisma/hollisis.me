import 'styled-components'

type AppTheme = typeof import('./theme').default

declare module 'styled-components' {
  export interface DefaultTheme extends AppTheme {}
}
