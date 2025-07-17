import React from 'react'
import { graphql, PageRendererProps, Link } from 'gatsby'
import styled from 'styled-components'
import { Layout, SEO } from '../components'
import { list_item } from '../styles'

const Section = styled(list_item.section)`
  font-family: Merriweather;
`
const Title = styled.h1`
  font-size: 2.5em;
  font-family: Montserrat;
  font-weight: 1000;
`
const StyledDate = styled.h3`
  font-weight: 100;
  font-size: 1em;
  margin-top: 0.25em;
`
const Post = styled.div`
  margin-top: 0.5em;
  font-size: 1.25em;
  list-style-position: inside;
  line-height: 1.75em;
  p {
    margin: 1.5em 0;
  }
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
`
const LinkSection = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`
const StyledLink = styled(Link)`
  color: black;
  text-decoration: none;
  background: #ccf;
  padding: 0.75em;
  border-radius: 0.5em;
  font-weight: bold;
  font-size: 1.1em;
  max-width: 300px;
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
      }
      html: string
    }
  }
}

const Blog = ({ data, pageContext, location }: Props) => {
  const { frontmatter, html } = data.markdownRemark!
  const { title, date } = frontmatter!
  const { previous, next } = pageContext

  const dateObj = new Date(date + 'T00:00')
  const dateArr = dateObj.toString().split(' ')
  const dateStr = `${dateArr[1]} ${Number(dateArr[2])}, ${dateArr[3]}`

  return (
    <Layout location={location}>
      <SEO title='Blog' />
      <Section>
        <Title>{title}</Title>
        <StyledDate>{dateStr}</StyledDate>
        <Post dangerouslySetInnerHTML={{ __html: html }} />
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
      }
      html
    }
  }
`
