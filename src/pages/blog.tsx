import React from 'react'
import { graphql, PageProps, Link } from 'gatsby'
import styled from 'styled-components'
import { Layout, SEO } from '../components'
import { list_item } from '../styles'

const Section = styled(list_item.section)`
  transition: transform 0.15s ease, box-shadow 0.15s ease;
  &:hover {
    transform: translateY(-8px);
    box-shadow: ${({ theme }) => theme.shadows.lg};
  }
`
const CardHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 1em;
`
const HeaderLeft = styled.div`
  flex: 1;
  min-width: 0;
`
const BlogLink = styled(Link)`
  font-size: 2em;
  font-weight: bold;
  line-height: 1.5em;
  color: ${({ theme }) => theme.colors.text};
  text-decoration: none;
`
const DateStr = styled.p``
const MAX_VISIBLE_TAGS = 2

const TagList = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.25em;
  flex-shrink: 1;
  max-width: 35%;
  min-width: 0;
  justify-content: flex-end;
`
const Tag = styled.span`
  font-size: 0.75em;
  padding: 0.1em 0.4em;
  border-radius: 4px;
  background: ${({ theme }) => theme.colors.surface};
  border: 2px solid ${({ theme }) => theme.colors.border};
  color: ${({ theme }) => theme.colors.textMuted ?? theme.colors.text};
`
const Post = styled.p`
  margin-top: 0.75em;
  line-height: 1.5em;
`

type Data = {
  postsQuery: {
    posts: {
      node: {
        fields: {
          slug: string
        }
        frontmatter: {
          title: string
          date: string
          tags?: string[]
        }
        excerpt: string
      }
    }[]
  }
}

const Blog = ({ data, location }: PageProps<Data>) => {
  const { posts } = data.postsQuery

  return (
    <Layout location={location}>
      <SEO title='Hollis Ma | Blog' />
      {posts &&
        posts.map(({ node }, i) => {
          const { fields, frontmatter, excerpt } = node
          const { title, date, tags } = frontmatter

          const dateObj = new Date(date + 'T00:00')
          const dateArr = dateObj.toString().split(' ')
          const dateStr = `${dateArr[1]} ${Number(dateArr[2])}, ${
            dateArr[3]
          }`

          // Ensure only one slash between pathname and slug
          const cleanPath = location.pathname.endsWith('/') ? location.pathname.slice(0, -1) : location.pathname;
          return (
            <Section key={i}>
              <CardHeader>
                <HeaderLeft>
                  <BlogLink to={`${cleanPath}${fields!.slug}`}>
                    {title}
                  </BlogLink>
                  <DateStr>{dateStr}</DateStr>
                </HeaderLeft>
                {tags && tags.length > 0 && (
                  <TagList>
                    {tags
                      .slice(0, MAX_VISIBLE_TAGS)
                      .map((tag, j) => (
                        <Tag key={j}>{tag}</Tag>
                      ))}
                    {tags.length > MAX_VISIBLE_TAGS && (
                      <Tag>+{tags.length - MAX_VISIBLE_TAGS}</Tag>
                    )}
                  </TagList>
                )}
              </CardHeader>
              <Post>{excerpt}</Post>
            </Section>
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
        }
      }
    }
  }
`
