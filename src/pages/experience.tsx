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
        html: string
      }
    }[]
  }
}

const Experience = ({ data }: PageProps<Data>) => {
  const edges = data.allMarkdownRemark.edges

  return (
    <Layout>
      <SEO title='Experience' />
      {data &&
        edges.map(({ node }, i) => {
          const { frontmatter, html } = node
          const { title, company, tech, range } = frontmatter
          return (
            <div key={i}>
              <h1>{title}</h1>
              <h2>{company}</h2>
              <h3>{tech}</h3>
              <h3>{range}</h3>
              <div dangerouslySetInnerHTML={{ __html: html }} />
            </div>
          )
        })}
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
