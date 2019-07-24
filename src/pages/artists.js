import React, { useState } from 'react'
import Page from '../components/page';
import { graphql } from 'gatsby'
import extractNodes from '../helpers/extractNodes'
import Artists from '../components/artists';
import Filters from '../components/filters';
import Search from '../components/search';

const ArtistsPage = ({ data }) => {
  const artists = extractNodes(data.allContentfulArtist)
  const [ artistIds, setArtistIds ] = useState([])
  const filteredArtists = artists.filter(a => artistIds.includes(a.id))

  const doSearch = evt => {
    console.log(evt.target.value)
  }

  return (
    <Page>
      <Search doSearch={doSearch} />
      <Filters filterArtists={setArtistIds} />
      <Artists artists={filteredArtists.length ? filteredArtists : artists} />
    </Page>
  )
}

export const query = graphql`
  query ArtistsPageQuery {
    allContentfulArtist(sort: {fields: lastName}) {
      edges {
        node {
          id
          name
          lastName
          slug
          locations {
            region
            state
            id
          }
          media {
            name
            id
          }
          imageThumbnail {
            description
            fluid(maxWidth: 270) {
              ...GatsbyContentfulFluid_withWebp
            }
          }
        }
      }
    }
  }
`

export default ArtistsPage
