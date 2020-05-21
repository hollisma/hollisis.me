import React from 'react'
import { graphql, PageProps } from 'gatsby'
import { Layout, SEO } from '../components'

type Data = {
  blurb: {
    blurb_edges: {
      node: {
        html: string
      }
    }[]
  }
  courses: {
    course_edges: {
      node: {
        fields: {
          slug: string
        }
        frontmatter: {
          title: string
        }
        html: string
      }
    }[]
  }
}

const Education = ({ data }: PageProps<Data>) => {
  const { blurb, courses } = data
  const { blurb_edges } = blurb
  const { course_edges } = courses

  return (
    <Layout>
      <SEO title='Education' />
      {blurb_edges && (
        <div dangerouslySetInnerHTML={{ __html: blurb_edges[0].node.html }} />
      )}
      {course_edges &&
        course_edges.map(({ node }, i) => {
          const { fields, frontmatter, html } = node
          const slug = fields.slug.split('/')[2]
          const { title } = frontmatter

          return (
            <div key={i}>
              <h2>{title}</h2>
              <h3>{slug}</h3>
              <p dangerouslySetInnerHTML={{ __html: html }} />
            </div>
          )
        })}
    </Layout>
  )
}

export default Education

export const pageQuery = graphql`
  {
    blurb: allMarkdownRemark(
      filter: { fileAbsolutePath: { regex: "/education/blurb/" } }
    ) {
      blurb_edges: edges {
        node {
          html
        }
      }
    }
    courses: allMarkdownRemark(
      filter: { fileAbsolutePath: { regex: "/education/courses/" } }
      sort: { fields: [frontmatter___title], order: ASC }
    ) {
      course_edges: edges {
        node {
          fields {
            slug
          }
          frontmatter {
            title
          }
          html
        }
      }
    }
  }
`
