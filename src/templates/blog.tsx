import React from 'react'
import { graphql, PageRendererProps, Link } from 'gatsby'
import styled, { css } from 'styled-components'
import { Layout, SEO } from '../components'
import { list_item } from '../styles'

const Section = styled(list_item.section)`
  font-family: Merriweather;
`
const Title = styled.h1`
  font-size: 2.5em;
  font-family: Montserrat;
  font-weight: 1000;
  @media (max-width: 40em) {
    font-size: 1.75em;
  }
`
const StyledDate = styled.h3`
  font-weight: 100;
  font-size: 1em;
  margin-top: 0.25em;
`
const ReadingTime = styled.p`
  font-weight: 100;
  font-size: 0.9em;
  margin-top: 0.15em;
  color: ${({ theme }) => theme.colors.muted ?? theme.colors.text};
`
const TagList = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.25em;
  margin-top: 0.25em;
`
const Tag = styled(Link)`
  font-size: 0.75em;
  padding: 0.1em 0.4em;
  border-radius: 4px;
  background: ${({ theme }) => theme.colors.surface};
  border: 2px solid ${({ theme }) => theme.colors.border};
  color: ${({ theme }) => theme.colors.muted ?? theme.colors.text};
  text-decoration: none;
  transition: background 0.15s ease, border-color 0.15s ease;
  &:hover {
    background: ${({ theme }) => theme.colors.border};
    border-color: ${({ theme }) => theme.colors.text};
  }
`
const Post = styled.div<{ isPoem?: boolean }>`
  margin-top: 0.25em;
  font-size: 1em;
  list-style-position: inside;
  line-height: 1.75em;
  p {
    margin: 1.5em 0;
  }
  ${props => props.isPoem && css`
    line-height: 1.6em;
    p {
      white-space: pre-line;
      margin: 0 0 1.25em 0;
    }
    p:first-of-type {
      margin-top: 1.5em;
    }
  `}
  p a.footnote_small {
    color: green;
    position: relative;
    bottom: 7px;
    font-size: 0.75em;
  }
  li {
    margin: 1em 0;
  }
  a {
    color: green;
  }
  .anchor {
    display: inline-block;
    position: relative;
    top: -75px;
    visibility: hidden;
  }
  figure {
    padding-top: 0.5em;
  }
  figcaption {
    margin-top: 0.75em;
    text-align: center;
    font-size: 0.75em;
  }
  h1, h2 {
    margin: 1.5em 0 0.75em 0;
  }
  h1 + h2 {
    margin-top: 0.5em;
  }
  h2:has(+ h5) {
    margin-bottom: 0.0em;
  }
`
const LinkSection = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  gap: 1em;
  @media (max-width: 40em) {
    flex-direction: column;
  }
`
const StyledLink = styled(Link)`
  background: #ccf;
  max-width: 300px;
  background-color: ${({ theme }) => theme.colors.surface};
  border: 1px solid ${({ theme }) => theme.colors.border};
  box-shadow: ${({ theme }) => theme.shadows.sm};
  padding: 1em 2em;
  border-radius: 1em;
  transition: transform 0.15s ease, box-shadow 0.15s ease;
  &:hover {
    transform: translateY(-8px);
    box-shadow: ${({ theme }) => theme.shadows.lg};
  }
`
const ForwardLink = styled(StyledLink)`
  float: right;
  margin-left: auto;
`
const LeftArrow = styled.span`
  font-size: 1.25em;
  &::before {
    content: '←';
  }
`
const RightArrow = styled.span`
  font-size: 1.25em;
  &::before {
    content: '→';
  }
`

interface Props extends PageRendererProps {
  pageContext: {
    previous?: {
      fields?: {
        slug?: string
      }
      frontmatter?: {
        title?: string
      }
    }
    next?: {
      fields?: {
        slug?: string
      }
      frontmatter?: {
        title?: string
      }
    }
  }
  data: {
    markdownRemark: {
      fields: {
        slug: string
      }
      frontmatter: {
        title: string
        date: string
        poem?: boolean
        tags?: string[]
      }
      html: string
      excerpt: string
      timeToRead?: number
    }
  }
}

const Blog = ({ data, pageContext, location }: Props) => {
  const { frontmatter, html, excerpt, timeToRead } = data.markdownRemark!
  const { title, date, poem, tags } = frontmatter!
  const { previous, next } = pageContext

  const dateObj = new Date(date + 'T00:00')
  const dateArr = dateObj.toString().split(' ')
  const dateStr = `${dateArr[1]} ${Number(dateArr[2])}, ${dateArr[3]}`
  const readingTimeStr =
    timeToRead != null && timeToRead > 0
      ? `${timeToRead} min read`
      : null

  const articleJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: title,
    datePublished: date,
    author: {
      '@type': 'Person',
      name: 'Hollis Ma',
      url: 'https://hollisis.me',
    },
  }

  return (
    <Layout location={location}>
      <SEO
        title={`${title} | Hollis Ma`}
        description={excerpt}
        pathname={location.pathname}
        ogType='article'
        jsonLd={articleJsonLd}
      />
      <Section>
        <Title>{title}</Title>
        <StyledDate>{dateStr}</StyledDate>
        {readingTimeStr && <ReadingTime>{readingTimeStr}</ReadingTime>}
        {tags && tags.length > 0 && (
          <TagList>
            {tags.map((tag, i) => (
              <Tag key={i} to={`/blog/${tag}`}>
                {tag}
              </Tag>
            ))}
          </TagList>
        )}
        <Post isPoem={poem} dangerouslySetInnerHTML={{ __html: html }} />
      </Section>
      <LinkSection>
        {next && (
          <StyledLink to={`/blog${next.fields!.slug!}`}>
            <LeftArrow /> {next.frontmatter!.title!}
          </StyledLink>
        )}
        {previous && (
          <ForwardLink to={`/blog${previous.fields!.slug!}`}>
            {previous.frontmatter!.title!} <RightArrow />
          </ForwardLink>
        )}
      </LinkSection>
    </Layout>
  )
}

export default Blog

export const pageQuery = graphql`
  query($slug: String!) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
      fields {
        slug
      }
      frontmatter {
        title
        date
        poem
        tags
      }
      excerpt(pruneLength: 250)
      html
      timeToRead
    }
  }
`
