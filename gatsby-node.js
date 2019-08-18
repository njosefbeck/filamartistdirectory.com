const path = require('path')

exports.createPages = ({ graphql, actions}) => {
  const { createPage } = actions
  return graphql(`
    {
      allContentfulArtist {
        edges {
          node {
            slug
          }
        }
      }
    }
  `)
  .then(result => {
    result.data.allContentfulArtist.edges.forEach(({ node }) => {
      createPage({
        path: `${node.slug}`,
        component: path.resolve('./src/templates/artist-page.js'),
        context: {
          slug: node.slug
        }
      })
    })
  })
}