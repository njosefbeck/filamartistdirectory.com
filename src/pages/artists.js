import React, { useState } from 'react'
import * as JsSearch from 'js-search'
import Page from '../components/page'
import { Helmet } from 'react-helmet'
import { graphql } from 'gatsby'
import extractNodes from '../helpers/extractNodes'
import Artists from '../components/artists'
import Filters from '../components/filters'
import Search from '../components/search'

const buildSearchIndex = artists => {
  if (!artists || !artists.length) {
    return
  }

  const search = new JsSearch.Search('name')

  search.addIndex('firstName')
  search.addIndex('lastName')
  search.addDocuments(artists)

  return search
}

const filterArtists = (artists, filteredIds, foundIds) => {
  if (filteredIds.length && foundIds.length) {
    return artists
      .filter(a => filteredIds.includes(a.id))
      .filter(a => foundIds.includes(a.id))
  }

  if (filteredIds.length) {
    return artists.filter(a => filteredIds.includes(a.id))
  }

  if (foundIds.length) {
    return artists.filter(a => foundIds.includes(a.id))
  }

  return artists
}

const ArtistsPage = ({ data }) => {
  const contentfulArtists = extractNodes(data.allContentfulArtist)
  const searchIndex = buildSearchIndex(contentfulArtists)
  const [ filteredIds, setFilteredArtistIds ] = useState([])
  const [ foundIds, setFoundIds ] = useState([])
  const artists = filterArtists(contentfulArtists, filteredIds, foundIds)
  
  const doSearch = evt => {
    let foundArtists = searchIndex.search(evt.target.value);

    setFoundIds(foundArtists.map(a => a.id))
  }


  return (
    <Page>
      <Helmet>
        <title>Artists | Filipino American Artist Directory</title>
        <meta property="og:url" content={`https://filamartistdirectory.com/artists`} />
        <meta property="og:title" content={`Artists | Filipino American Artist Directory`} />
      </Helmet>
      <Search doSearch={doSearch} />
      <Filters filterArtists={setFilteredArtistIds} />
      <Artists artists={artists} />
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
          firstName
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
