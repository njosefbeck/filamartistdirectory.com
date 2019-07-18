import React from 'react'
import { graphql } from 'gatsby'
import Page from "../components/page";

const ArtistPage = ({ data }) => {
  const artist = data.contentfulArtist
  return (
    <Page>
      {artist.name}
    </Page>
  )
}

export const query = graphql`
  query($slug: String!) {
    contentfulArtist(slug: { eq: $slug }) {
      name
    }
  }
`

export default ArtistPage
