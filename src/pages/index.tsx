import React from 'react'
import { graphql, PageProps, Link } from 'gatsby'
import styled from 'styled-components'
import { Layout, SEO } from '../components'

type Data = {
  site: {
    siteMetadata: {
      description: string
    }
  }
}

const Header = styled.h1`
  font-size: 2.5em;
`

const StyledLink = styled(Link)`
  display: block;
  background-color: lightblue;
  margin: 1em 0;
  padding: 25px;
  font-size: 24px;
  border-radius: 0.5em;
  text-decoration: none;
  color: #f48;
`

const HomePage = ({ data }: PageProps<Data>) => {
  const { description } = data.site.siteMetadata

  return (
    <Layout>
      <SEO title='home' />
      <Header>{description} :)</Header>
      <StyledLink to='/education'>Education</StyledLink>
      <StyledLink to='/experience'>Experience </StyledLink>
      <StyledLink to='/projects'>Projects</StyledLink>
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
  }
`
