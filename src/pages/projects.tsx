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
          description: string
          github: string
          external: string
          tech: string
        }
        html: string
      }
    }[]
  }
}

const Projects = ({ data }: PageProps<Data>) => {
  const { edges } = data.allMarkdownRemark

  return (
    <Layout>
      <SEO title='Projects' />
      {edges &&
        edges.map(({ node }, i) => {
          const { frontmatter, html } = node
          const { title, description, github, external, tech } = frontmatter

          return (
            <div key={i}>
              <h1>{title}</h1>
              <h2>{description}</h2>
              <h3>{tech}</h3>
              <div>
                {github && (
                  <a
                    href={github}
                    target='_blank'
                    rel='nofollow noopener noreferrer'
                  >
                    Github Link
                  </a>
                )}
                {external && (
                  <a
                    href={external}
                    target='_blank'
                    rel='nofollow noopener noreferrer'
                  >
                    Check it out!
                  </a>
                )}
              </div>
              <div dangerouslySetInnerHTML={{ __html: html }} />
            </div>
          )
        })}
    </Layout>
  )
}

export default Projects

export const pageQuery = graphql`
  {
    allMarkdownRemark(
      filter: { fileAbsolutePath: { regex: "/projects/" } }
      sort: { fields: [frontmatter___date], order: ASC }
    ) {
      edges {
        node {
          frontmatter {
            title
            description
            github
            external
            tech
          }
          html
        }
      }
    }
  }
`
