import React from 'react'
import { graphql, PageProps, Link } from 'gatsby'
import styled from 'styled-components'
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

const Header = styled.h1`
  font-size: 2.5em;
`

const About = styled.div`
  font-size: 1.5em;
  margin-bottom: 1.5em;
`

const StyledLink = styled(Link)`
  display: block;
  background-color: #8d9;
  margin: 1em 0;
  padding: 25px;
  font-size: 24px;
  border-radius: 0.5em;
  text-decoration: none;
  color: #f33;
  transition: all 0.2s ease;
  &:hover {
    background-color: #6b7;
    color: #c00;
  }
`

const HomePage = ({ data }: PageProps<Data>) => {
  const { site, allMarkdownRemark } = data!
  const { description } = site.siteMetadata
  const { html } = allMarkdownRemark.edges![0].node

  return (
    <Layout>
      <SEO title='Hollis Ma' />
      <Header>{description} :)</Header>
      <About dangerouslySetInnerHTML={{ __html: html }} />
      {navLinks.map(
        ({ name, url }) =>
          name !== 'Home' && (
            <StyledLink to={url} key={name}>
              {name}
            </StyledLink>
          )
      )}
    </Layout>
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
