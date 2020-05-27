import React from 'react'
import { graphql, PageRendererProps, Link } from 'gatsby'
import styled from 'styled-components'
import { Layout, SEO } from '../components'
import { list_item } from '../styles'

const Section = list_item.section
const Post = styled.p`
  margin-top: 1em;
  font-size: 1em;
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
`
const ForwardLink = styled(StyledLink)`
  float: right;
  margin-left: auto;
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
      }
      html: string
    }
  }
}

const Blog = ({ data, pageContext }: Props) => {
  const { frontmatter, html } = data.markdownRemark!
  const { title } = frontmatter!
  const { previous, next } = pageContext

  return (
    <Layout>
      <SEO title='Blog' />
      <Section>
        <h1>{title}</h1>
        <Post dangerouslySetInnerHTML={{ __html: html }} />
      </Section>
      <LinkSection>
        {previous && (
          <StyledLink to={previous.fields!.slug!}>
            ←{previous.frontmatter!.title!}
          </StyledLink>
        )}
        {next && (
          <ForwardLink to={next.fields!.slug!}>
            {next.frontmatter!.title!}→
          </ForwardLink>
        )}
      </LinkSection>
    </Layout>
  )
}

export default Blog

export const pageQuery = graphql`
  query($path: String!) {
    markdownRemark(fields: { slug: { eq: $path } }) {
      fields {
        slug
      }
      frontmatter {
        title
      }
      html
    }
  }
`
