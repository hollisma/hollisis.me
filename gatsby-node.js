const { createFilePath } = require(`gatsby-source-filesystem`)

exports.onCreateNode = ({ node, actions, getNode }) => {
  const { createNodeField } = actions

  if (node.internal.type === `MarkdownRemark`) {
    const value = createFilePath({ node, getNode })
    createNodeField({
      name: `slug`,
      node,
      value,
    })
  }
}

/**
 * Using @components in TypeScript gives a warning, so I'm just going to do '../components'.
 * If the project gets big, then maybe I can do _components or some other prefix, but @ is the convention I think
 */

// const path = require('path')

// exports.onCreateWebpackConfig = ({ actions }) => {
//   actions.setWebpackConfig({
//     resolve: {
//       alias: {
//         '@components': path.resolve(__dirname, 'src/components'),
//         '@pages': path.resolve(__dirname, 'src/pages'),
//         '@styles': path.resolve(__dirname, 'src/styles'),
//       },
//     },
//   })
// }
