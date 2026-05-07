import React from 'react'
import { graphql, PageProps, Link } from 'gatsby'
import styled from 'styled-components'
import { Layout, SEO, BlogSnippet } from '../components'

const TagHeading = styled.h1`
  font-size: 2em;
  font-family: Montserrat;
  font-weight: 700;
  margin-bottom: 1em;
`
const BackLink = styled(Link)`
  display: inline-block;
  margin-bottom: 1em;
  color: ${({ theme }) => theme.colors.text};
  text-decoration: none;
  font-size: 0.95em;
  &:hover {
    text-decoration: underline;
  }
`

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

type PageContext = {
  tag: string
}

function formatDate(date: string): string {
  const dateObj = new Date(date + 'T00:00')
  const dateArr = dateObj.toString().split(' ')
  return `${dateArr[1]} ${Number(dateArr[2])}, ${dateArr[3]}`
}

const BlogTag = ({ data, pageContext, location }: PageProps<Data, PageContext>) => {
  const { posts } = data.postsQuery
  const { tag } = pageContext

  return (
    <Layout location={location}>
      <SEO title={`Posts tagged "${tag}" | Hollis Ma Blog`} pathname={location.pathname} />
      <BackLink to="/blog">← All posts</BackLink>
      <TagHeading>Posts tagged "{tag}"</TagHeading>
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
              basePath="/blog"
              maxVisibleTags={undefined}
            />
          )
        })}
    </Layout>
  )
}

export default BlogTag

export const pageQuery = graphql`
  query($tag: String!) {
    postsQuery: allMarkdownRemark(
      filter: {
        fileAbsolutePath: { regex: "/blog/" }
        frontmatter: { tags: { in: [$tag] } }
      }
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
