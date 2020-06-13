import React from 'react'
import { graphql, PageProps } from 'gatsby'
import Img, { FluidObject } from 'gatsby-image'
import styled from 'styled-components'
import { Layout, SEO } from '../components'

const StyledImg = styled(Img)`
  display: inline-block;
  width: 250px;
  margin: 10px;
`

type ChildImage = {
  childImageSharp: {
    fluid: FluidObject
  }
}

type Data = {
  img1: ChildImage
  img2: ChildImage
  img3: ChildImage
}

const Blog = ({ data, location }: PageProps<Data>) => {
  console.log(data)

  return (
    <Layout location={location} size='large'>
      <SEO title='Hollis Ma | Art' />
      <StyledImg fluid={data.img1.childImageSharp.fluid} />
      <StyledImg fluid={data.img2.childImageSharp.fluid} />
      <StyledImg fluid={data.img3.childImageSharp.fluid} />
    </Layout>
  )
}

export default Blog

export const squareImage = graphql`
  fragment squareImage on File {
    childImageSharp {
      fluid(maxWidth: 200, maxHeight: 200) {
        ...GatsbyImageSharpFluid
      }
    }
  }
`

export const query = graphql`
  query {
    img1: file(relativePath: { eq: "Tree1.png" }) {
      ...squareImage
    }
    img2: file(relativePath: { eq: "Brain.png" }) {
      ...squareImage
    }
    img3: file(relativePath: { eq: "blueberry.png" }) {
      ...squareImage
    }
  }
`
