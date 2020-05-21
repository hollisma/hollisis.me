import React from 'react'
import { graphql, PageProps, Link } from 'gatsby'
import styled from 'styled-components'
import { Layout, SEO } from '../components'

type Data = {
  site: {
    siteMetadata: {
      title: string
      description: string
    }
  }
}

// const Title = styled.h2<{ yes?: boolean }>`
//   color: ${props => (props.yes ? 'red' : 'blue')};
// `

const StyledLink = styled(Link)`
  display: block;
  background-color: lightblue;
  margin: 10px;
  padding: 25px;
  font-size: 24px;
`

const IndexPage = ({ data }: PageProps<Data>) => {
  const { title, description } = data.site.siteMetadata

  return (
    <Layout>
      <SEO title='home' />
      <p>{description}</p>
      <StyledLink to='/education'>Education</StyledLink>
      <StyledLink to='/experience'>Experience </StyledLink>
      <StyledLink to='/projects'>Projects</StyledLink>
    </Layout>
  )
}

export default IndexPage

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
        description
      }
    }
  }
`
