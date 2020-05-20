import React from 'react'
import { graphql, PageProps } from 'gatsby'
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

const Title = styled.h2<{ yes?: boolean }>`
  color: ${props => (props.yes ? 'red' : 'blue')};
`

const IndexPage = ({ data }: PageProps<Data>) => {
  const { title, description } = data.site.siteMetadata

  return (
    <Layout>
      <SEO title='home' />
      <Title>{title}</Title>
      <Title yes>{title}</Title>
      <p>{description}</p>
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
