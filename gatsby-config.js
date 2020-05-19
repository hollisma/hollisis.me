const siteTitle = `hollis-ma-personal-website`
const siteDescription = 'Personal website for Hollis Ma'
const siteAuthor = `@hollisma`
const siteUrl = ``
const siteImage = `${siteUrl}/icons/icon.png`
const siteKeywords = [
  'student',
  'princeton',
  'gatsby',
  'typescript',
  'javascript',
  'react',
]

module.exports = {
  siteMetadata: {
    title: siteTitle,
    description: siteDescription,
    author: siteAuthor,
    url: siteUrl,
    image: siteImage,
    keywords: siteKeywords,
  },
  plugins: [
    `gatsby-plugin-react-helmet`,
    `gatsby-plugin-sass`,
    `gatsby-plugin-typescript`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: siteTitle,
        short_name: siteTitle,
        description: siteDescription,
        start_url: `/`,
        background_color: `#6b37bf`,
        theme_color: `#6b37bf`,
        display: `minimal-ui`,
        icon: `src/images/icon.png`,
      },
    },
    `gatsby-plugin-offline`,
  ],
}
