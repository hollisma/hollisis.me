import React from 'react'
import { graphql, PageProps, Link } from 'gatsby'
import styled from 'styled-components'
import Prose from '../styles/prose'
import { Layout, SEO } from '../components'
import { navLinks } from '../config'

type Data = {
  site: {
    siteMetadata: {
      description: string
    }
  }
  allMarkdownRemark: {
    edges: {
      node: {
        html: string
      }
    }[]
  }
}

const NoBottomPaddingLayout = styled(Layout)``
const Header = styled.h1`
  font-size: 2em;
`
const About = styled(Prose)`
  img {
    max-width: 800px;
    width: 100%;
    height: auto;
    display: block;
    margin: 2em auto;
    border: 3px solid ${({ theme }) => theme.colors.border};
    border-radius: 1.5em;
    box-shadow: ${({ theme }) => theme.shadows.md};
  }
  figure {
    margin: 1.25em;
    margin-bottom: 2em;
  }
  ul {
    margin: 0.25em 0 1.25em;
  }
  ul:last-of-type {
    margin-bottom: 0;
  }
  li {
    margin-bottom: 0.25em;
  }
`
const StyledLink = styled(Link)`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  margin: 0.5em 0;
  padding: 0;
  font-size: 1.125rem;
  text-decoration: none;
  color: ${({ theme }) => theme.colors.accent};
  font-weight: 600;
  &:hover { text-decoration: underline; }
`

const personJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: 'Hollis Ma',
  url: 'https://hollisis.me',
  sameAs: [
    'https://github.com/hollisma',
    'https://www.linkedin.com/in/hollis-ma/',
  ],
  alumniOf: {
    '@type': 'CollegeOrUniversity',
    name: 'Princeton University',
  },
}

const HomePage = ({ data, location }: PageProps<Data>) => {
  const { site, allMarkdownRemark } = data!
  const { description } = site.siteMetadata
  const { html } = allMarkdownRemark.edges![0].node

  return (
    <NoBottomPaddingLayout location={location}>
      <SEO title='Hollis Ma' pathname={location.pathname} jsonLd={personJsonLd} />
      <Header>Hi there! I'm Hollis...</Header>
      {/* <Header>{description} :)</Header> */}
      <About dangerouslySetInnerHTML={{ __html: html }} />
    </NoBottomPaddingLayout>
  )
}

export default HomePage

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        description
      }
    }
    allMarkdownRemark(filter: { fileAbsolutePath: { regex: "/about/" } }) {
      edges {
        node {
          html
        }
      }
    }
  }
`
