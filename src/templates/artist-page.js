import './artist-page.css'
import React from 'react'
import { graphql } from 'gatsby'
import Page from "../components/page";

const ArtistPage = ({ data }) => {
  const artist = data.contentfulArtist
  const biographyHtml = artist.biography.childMarkdownRemark.html
  return (
    <Page>
      <div className='biography' dangerouslySetInnerHTML={{ __html: biographyHtml }} />
    </Page>
  )
}

export const query = graphql`
  query($slug: String!) {
    contentfulArtist(slug: { eq: $slug }) {
      name
      biography {
        childMarkdownRemark {
          html
        }
      }
      id
      slug
      facebookShareImage {
        file {
          url
        }
      }
      metaDescription
      videos {
        embedType
        title
        id
      }
    }
  }
`

export default ArtistPage
