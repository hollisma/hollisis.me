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
  pathname?: string
  author?: string
  keywords?: string[]
  meta?: MetaItem[]
  image?: string
  ogType?: string
  jsonLd?: object | object[]
}

const SEO: React.FC<SEOProps> = props => {
  const data = useStaticQuery(graphql`
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
  `)

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
  const siteUrl = url
  const canonicalUrl = props.pathname ? `${siteUrl}${props.pathname}` : siteUrl
  const siteImage = props.image || image
  const siteKeywords = [...keywords, ...(props.keywords ?? [])].join(',')
  const ogType = props.ogType || 'website'

  const metaData = [
    {
      name: `description`,
      content: siteDescription,
    },
    {
      property: `og:title`,
      content: siteTitle,
    },
    {
      property: `og:description`,
      content: siteDescription,
    },
    {
      property: `og:url`,
      content: canonicalUrl,
    },
    {
      property: `og:image`,
      content: siteImage,
    },
    {
      property: `og:type`,
      content: ogType,
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
  ].concat(meta as any)

  const linkData = [
    { rel: 'shortcut icon', href: 'favicon.ico' },
    { rel: 'canonical', href: canonicalUrl },
  ]

  const scriptData = props.jsonLd
    ? [
        {
          type: 'application/ld+json',
          innerHTML: JSON.stringify(props.jsonLd),
        },
      ]
    : []

  return (
    <Helmet
      htmlAttributes={{ lang: 'en' }}
      title={siteTitle}
      titleTemplate={`${siteTitle}`}
      meta={metaData}
      link={linkData}
      script={scriptData}
    />
  )
}

export default SEO
