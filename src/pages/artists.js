import React, { useState } from 'react'
import Page from '../components/page';
import { graphql } from 'gatsby'
import extractNodes from '../helpers/extractNodes'
import Artists from '../components/artists';
import Filters from '../components/filters';

const updateArtistIds = (artistIds, ids) => {
  let updated = [ ...artistIds ]

  for (const id of ids) {
    if (updated.includes(id)) {
      updated = updated.filter(aId => aId !== id)
    } else {
      updated = [ ...updated, id ]
    }
  }

  return updated
}

const flattenArtistIds = ids => {
  const flattened = []
  for (const category in ids) {
    flattened.push(...ids[category])
  }
  return [ ...new Set(flattened) ]
}

const ArtistsPage = ({ data }) => {
  const artists = extractNodes(data.allContentfulArtist)
  const [ artistIds, setArtistIds ] = useState({
    Region: [],
    State: [],
    Media: [],
  })

  const flattenedArtistIds = flattenArtistIds(artistIds)
  const filteredArtists = artists.filter(a => flattenedArtistIds.includes(a.id))

  console.log(artists)
  console.log(filteredArtists)

  const filterArtists = (categoryName, ids) => {
    setArtistIds({
      ...artistIds,
      [categoryName]: updateArtistIds(artistIds[categoryName], ids)
    })
  }

  return (
    <Page>
      <Filters filterArtists={filterArtists} />
      <Artists artists={filteredArtists.length ? filteredArtists : artists} />
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
