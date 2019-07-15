import './ArtistCount.css'
import React from 'react'
import { useStaticQuery, graphql } from 'gatsby'

const ArtistCount = () => {
  const data = useStaticQuery(graphql`
    query ArtistCountQuery {
      allContentfulArtist {
        totalCount
      }
    }
  `)
  return (
    <p className='artist-count'>Currently listing {data.allContentfulArtist.totalCount} artists</p>
  )
}

export default ArtistCount
