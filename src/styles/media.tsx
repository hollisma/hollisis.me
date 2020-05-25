import { css } from 'styled-components'

interface sizeType {
  [key: string]: number
}

interface accType {
  [key: string]: (input: any) => any
}

// Denotes smallest size for each type
const sizes: sizeType = {
  tablet: 768,
  desktop: 1000,
  giant: 1440,
}

// export const media = Object.keys(sizes).reduce((acc: accType, cur: string) => {
//   // Use em for cross-browser support
//   const emSize = sizes[cur] / 16
//   acc[cur] = (...args) => css`
//     @media (max-width: ${emSize}em) {
//       ${css(...args)}
//     }
//   `
//   return acc
// }, {})

export const media = (w: number) => {
  return (styles: TemplateStringsArray) => css`
    @media (max-width: ${w / 16}em) {
      ${css(styles)}
    }
  `
}

export default media
