import './artist-page.css'
import React from 'react'
import { graphql } from 'gatsby'
import Page from "../components/page";
import Gallery from '../components/gallery';

const ArtistPage = ({ data }) => {
  const artist = data.contentfulArtist
  const biographyHtml = artist.biography.childMarkdownRemark.html
  const haveGallery = artist.gallery && artist.gallery.length > 0

  return (
    <Page>
      {haveGallery && <Gallery images={artist.gallery} />}
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
      gallery {
        description
        fluid(maxWidth: 700) {
          ...GatsbyContentfulFluid_withWebp
        }
      }
      videos {
        embedType
        title
        id
      }
    }
  }
`

export default ArtistPage
