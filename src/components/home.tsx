import React from 'react'
import { graphql, useStaticQuery } from 'gatsby'
import styled from 'styled-components'
import SEO from './seo'

const Title = styled.h2<{ yes?: boolean }>`
  color: ${props => (props.yes ? 'red' : 'blue')};
`

const Home: React.FC<{}> = () => {
  const data = useStaticQuery(graphql`
    query BasicStaticQuery {
      site {
        siteMetadata {
          title
          description
        }
      }
    }
  `)

  const { title, description } = data.site.siteMetadata

  return (
    <div>
      <SEO title='Basic' />
      <Title>{title}</Title>
      <Title yes>{title}</Title>
      <p>{description}</p>
    </div>
  )
}

export default Home
