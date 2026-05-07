import React from 'react'
import { graphql, PageProps } from 'gatsby'
import { Layout, SEO, BlogSnippet } from '../components'

type Data = {
  postsQuery: {
    posts: {
      node: {
        fields: { slug: string }
        frontmatter: { title: string; date: string; tags?: string[] }
        excerpt: string
        timeToRead?: number
      }
    }[]
  }
}

function formatDate(date: string): string {
  const dateObj = new Date(date + 'T00:00')
  const dateArr = dateObj.toString().split(' ')
  return `${dateArr[1]} ${Number(dateArr[2])}, ${dateArr[3]}`
}

const Blog = ({ data, location }: PageProps<Data>) => {
  const { posts } = data.postsQuery
  const basePath = location.pathname.endsWith('/')
    ? location.pathname.slice(0, -1)
    : location.pathname

  return (
    <Layout location={location}>
      <SEO title='Hollis Ma | Blog' pathname={location.pathname} />
      {posts &&
        posts.map(({ node }, i) => {
          const { fields, frontmatter, excerpt, timeToRead } = node
          const { title, date, tags } = frontmatter
          return (
            <BlogSnippet
              key={i}
              slug={fields.slug}
              title={title}
              dateStr={formatDate(date)}
              excerpt={excerpt}
              tags={tags}
              readingTimeMinutes={timeToRead}
              basePath={basePath}
              maxVisibleTags={2}
            />
          )
        })}
    </Layout>
  )
}

export default Blog

export const pageQuery = graphql`
  {
    postsQuery: allMarkdownRemark(
      filter: { fileAbsolutePath: { regex: "/blog/" } }
      sort: { fields: [frontmatter___date], order: DESC }
    ) {
      posts: edges {
        node {
          fields {
            slug
          }
          frontmatter {
            title
            date
            tags
          }
          excerpt(pruneLength: 200)
          timeToRead
        }
      }
    }
  }
`
