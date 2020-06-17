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

type Data = {
  allFile: {
    edges: {
      node: {
        id: string
        name: string
        childImageSharp: {
          fluid: FluidObject
        }
      }
    }[]
  }
}

const Blog = ({ data, location }: PageProps<Data>) => {
  const images = data.allFile.edges

  return (
    <Layout location={location} size='large'>
      <SEO title='Hollis Ma | Art' />
      {images.map(({ node }) => {
        const { id, name, childImageSharp } = node

        return <StyledImg key={id} title={name} fluid={childImageSharp.fluid} />
      })}
    </Layout>
  )
}

export default Blog

export const query = graphql`
  query {
    allFile(
      filter: {
        extension: { regex: "/(jpg)|(png)/" }
        relativeDirectory: { eq: "art" }
      }
    ) {
      edges {
        node {
          id
          name
          relativeDirectory
          childImageSharp {
            fluid(maxHeight: 200) {
              ...GatsbyImageSharpFluid
            }
          }
        }
      }
    }
  }
`
