import React from 'react'
import { graphql, PageProps } from 'gatsby'
import { FluidObject } from 'gatsby-image'

type Data = {
  bullet: {
    childImageSharp: {
      fluid: FluidObject
    }
  }
}

const Test = ({ data }: PageProps<Data>) => {
  console.log(data)
  return <div>hi</div>
}

export default Test

export const query = graphql`
  {
    bullet: file(relativePath: { eq: "bullet.jpeg" }) {
      childImageSharp {
        fluid(maxWidth: 100, maxHeight: 100) {
          base64
          aspectRatio
          src
          srcSet
          sizes
        }
      }
    }
  }
`
