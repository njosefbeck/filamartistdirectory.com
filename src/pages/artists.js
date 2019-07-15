import React from 'react'
import Page from '../components/page';
import { graphql } from 'gatsby'
import extractNodes from '../helpers/extractNodes'
import Artists from '../components/artists';

const ArtistsPage = ({ data }) => {
  const artists = extractNodes(data.allContentfulArtist)
  const locations = extractNodes(data.allContentfulLocation)
  const media = extractNodes(data.allContentfulMedium)

  return (
    <Page>
      <Artists artists={artists} />
    </Page>
  )
}

export const query = graphql`
  query ArtistsPageQuery {
    allContentfulArtist {
      edges {
        node {
          id
          name
          slug
          gallery {
            id
          }
          locations {
            region
            state
            id
          }
          media {
            name
            id
          }
        }
      }
    }
    allContentfulLocation {
      edges {
        node {
          id
          region
          state
          artist {
            id
          }
        }
      }
    }
    allContentfulMedium {
      edges {
        node {
          id
          name
          artist {
            id
          }
        }
      }
    }
  }
`

export default ArtistsPage
