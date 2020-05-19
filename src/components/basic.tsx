import React from 'react'
import { graphql, useStaticQuery } from 'gatsby'
import SEO from './seo'

const Basic: React.FC<{}> = () => {
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
      <h2>{title}</h2>
      <p>{description}</p>
    </div>
  )
}

export default Basic
