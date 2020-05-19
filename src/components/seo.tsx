import React from 'react'
import { Helmet } from 'react-helmet'
import { useStaticQuery, graphql } from 'gatsby'

type MetaItem = {
  name: string
  content: string
}

type SEOProps = {
  title?: string
  description?: string
  url?: string
  author?: string
  keywords?: string[]
  meta?: MetaItem[]
  image?: string
}

const SEO: React.FC<SEOProps> = props => {
  const data = useStaticQuery(
    graphql`
      query {
        site {
          siteMetadata {
            title
            description
            author
            url
            image
            keywords
          }
        }
      }
    `
  )

  const {
    title,
    description,
    author,
    url,
    image,
    keywords = [],
    meta = [],
  } = data.site.siteMetadata
  const siteTitle = props.title || title
  const siteDescription = props.description || description
  const siteAuthor = props.author || author
  const siteUrl = props.url || url
  const siteImage = props.image || image
  const siteKeywords = [...keywords, props.keywords].join(',')
  const metaData = [
    {
      name: `canonical`,
      content: siteUrl,
    },
    {
      name: `og:title`,
      content: siteTitle,
    },
    {
      name: `description`,
      content: siteDescription,
    },
    {
      name: `og:description`,
      content: siteDescription,
    },
    {
      name: 'og:url',
      content: siteUrl,
    },
    {
      name: `image`,
      content: siteImage,
    },
    {
      name: `og:image`,
      content: siteImage,
    },
    {
      name: `og:type`,
      content: `website`,
    },
    {
      name: `twitter:title`,
      content: siteTitle,
    },
    {
      name: `twitter:description`,
      content: siteDescription,
    },
    {
      name: `twitter:creator`,
      content: siteAuthor,
    },
    {
      name: `twitter:card`,
      content: `summary_large_image`,
    },
    {
      name: `twitter:image`,
      content: siteImage,
    },
    {
      name: `keywords`,
      content: siteKeywords,
    },
  ].concat(meta)

  const linkData = [
    {
      rel: 'shortcut icon',
      href: 'favicon.ico',
    },
    // {
    //   rel: "apple-touch-icon",
    //   href: "icons/apple-touch-icon.png",
    // },
  ]
  return (
    <Helmet
      htmlAttributes={{ lang: 'en' }}
      title={siteTitle}
      titleTemplate={`${siteTitle}`}
      meta={metaData}
      link={linkData}
    />
  )
}

export default SEO
