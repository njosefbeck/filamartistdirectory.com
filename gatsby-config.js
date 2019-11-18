require('dotenv').config()

module.exports = {
  siteMetadata: {
    title: `Filipino American Artist Directory`,
    description: `Filipino American Artist Directory is an independent initiative by St. Louis-based artist Janna Añonuevo Langholz to connect and make visible the broad community of visual artists of Filipino heritage living and working in the United States. It aims to increase the recognition of Filipino American artists through an online resource and series of publications, as well as group events, exhibitions, commissioned works, and collaborations with other artists and organizations.`,
    author: 'filamartistdirectory.com',
  },
  plugins: [
    `gatsby-plugin-react-helmet`,
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-source-contentful`,
      options: {
        spaceId: process.env.CONTENTFUL_SPACE_ID,
        // Learn about environment variables: https://gatsby.dev/env-vars
        accessToken: process.env.CONTENTFUL_ACCESS_TOKEN,
      },
    },
    `gatsby-transformer-remark`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `filamartistdirectory.com`,
        short_name: `FilAm`,
        start_url: `/`,
        background_color: `#f7f0eb`,
        theme_color: `#a2466c`,
        display: `standalone`,
        icon: `src/images/favicon-512x512.png`,
      },
    },
    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.dev/offline
    `gatsby-plugin-offline`,
  ],
}
