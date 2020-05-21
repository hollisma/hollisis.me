import React from 'react'
import { graphql, PageProps } from 'gatsby'
import { Layout, SEO } from '../components'

type Data = {
  allMarkdownRemark: {
    edges: {
      node: {
        fields: {
          slug: string
        }
        frontmatter: {
          title: string
          company: string
          tech: string
          range: string
          order: number
        }
        html: any
      }
    }
  }
}

const Experience = ({ data }: PageProps<Data>) => {
  // const nodes = data.allMarkdownRemark.edges
  const edges = data.allMarkdownRemark.edges

  console.log(edges)
  return (
    <Layout>
      <SEO title='Experience' />
      Lots of experience
    </Layout>
  )
}

export default Experience

export const pageQuery = graphql`
  {
    allMarkdownRemark(
      filter: { fileAbsolutePath: { regex: "/experience/" } }
      sort: { fields: [frontmatter___date], order: ASC }
    ) {
      edges {
        node {
          frontmatter {
            title
            company
            tech
            range
          }
          html
        }
      }
    }
  }
`
