import React from 'react'
import Page from '../components/page';
import { graphql } from 'gatsby'
import extractNodes from '../helpers/extractNodes'
import Artists from '../components/artists';
import Filters from '../components/filters';

const ArtistsPage = ({ data }) => {
  const artists = extractNodes(data.allContentfulArtist)

  return (
    <Page>
      <Filters />
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
  }
`

export default ArtistsPage
