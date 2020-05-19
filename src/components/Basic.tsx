import React from 'react'
import { graphql, useStaticQuery } from 'gatsby'

const Basic: React.FC<{}> = () => {
  const data = useStaticQuery(graphql`
    query BasicStaticQuery {
      site {
        siteMetadata {
          name
          description
        }
      }
    }
  `)

  const { name, description } = data.site.siteMetadata

  return (
    <div>
      <h2>{name}</h2>
      <p>{description}</p>
    </div>
  )
}

export default Basic
