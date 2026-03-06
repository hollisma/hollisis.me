const path = require('path')
const { createFilePath } = require(`gatsby-source-filesystem`)

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions
  const blogTemplate = path.resolve('src/templates/blog.tsx')
  const blogTagTemplate = path.resolve('src/templates/blogTag.tsx')

  const result = await graphql(`
    {
      allMarkdownRemark(
        filter: { fileAbsolutePath: { regex: "/blog/" } }
        sort: { order: DESC, fields: [frontmatter___date] }
      ) {
        edges {
          node {
            fields {
              slug
            }
            frontmatter {
              title
              tags
            }
          }
        }
      }
    }
  `)

  if (result.errors) throw result.errors

  const posts = result.data.allMarkdownRemark.edges

  // Create individual blog post pages
  posts.forEach((post, index) => {
    const previous = index === posts.length - 1 ? null : posts[index + 1].node
    const next = index === 0 ? null : posts[index - 1].node
    const slug = post.node.fields.slug

    createPage({
      path: `/blog${slug}`,
      component: blogTemplate,
      context: {
        slug,
        previous,
        next,
      },
    })
  })

  // Collect unique tags and create tag archive pages
  const tags = new Set()
  posts.forEach(({ node }) => {
    const postTags = node.frontmatter?.tags || []
    postTags.forEach((tag) => tags.add(tag))
  })
  tags.forEach((tag) => {
    createPage({
      path: `/blog/${tag}`,
      component: blogTagTemplate,
      context: { tag },
    })
  })
}

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

// Fix dev-404-page resolution from virtual fs (avoids "Can't resolve dev-404-page.js" on develop)
exports.onCreateWebpackConfig = ({ actions }) => {
  const dev404Path = path.join(__dirname, '.cache', 'dev-404-page.js')
  actions.setWebpackConfig({
    resolve: {
      alias: {
        // Match relative path from .cache/$virtual (Windows and *nix)
        './../../dev-404-page.js': dev404Path,
        '../../dev-404-page.js': dev404Path,
      },
    },
  })
}
