import './artist-page.css'
import React from 'react'
import { graphql } from 'gatsby'
import { Helmet } from 'react-helmet'
import Page from '../components/page'
import Gallery from '../components/gallery'
import Videos from '../components/videos'

const outputWebsite = url => (
  <div key={url} className='artist-website'>
    <a className='with-underline' href={url} target='_blank' rel="noopener noreferrer">{url}</a>
  </div>
)

const ArtistPage = ({ data }) => {
  const artist = data.contentfulArtist
  const biographyHtml = artist.biography.childMarkdownRemark.html
  const haveGallery = artist.gallery && artist.gallery.length > 0
  const haveVideos = artist.videos && artist.videos.length > 0
  const websites = artist.websites.length > 0 ? artist.websites.map(outputWebsite) : null

  return (
    <Page>
      <Helmet>
        <title>{artist.name} | Filipino American Artist Directory</title>
        <meta name="description" content={artist.metaDescription} />
        <meta property="og:url" content={`https://filamartistdirectory.com/artists/${artist.slug}`} />
        <meta property="og:type" content={`article`} />
        <meta property="og:title" content={`${artist.name} | Filipino American Artist Directory`} />
        <meta property="og:description" content={artist.metaDescription} />
        <meta property="og:image" content={`https:${artist.facebookShareImage.file.url}`} />
        <meta property="og:image:width" content={`1200`} />
        <meta property="og:image:height" content={`630`} />
      </Helmet>
      {haveGallery && !haveVideos && <Gallery images={artist.gallery} />}
      {haveVideos && <Videos videos={artist.videos} />}
      <div className='biography' dangerouslySetInnerHTML={{ __html: biographyHtml }} />
      {artist.websites.length > 0 && websites}
    </Page>
  )
}

export const query = graphql`
  query ArtistQuery ($slug: String!) {
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
        id
        description
        fluid(maxWidth: 700) {
          ...GatsbyContentfulFluid_withWebp
        }
      }
      videos {
        embedType
        title
        contentfulid
      }
      websites
    }
  }
`

export default ArtistPage
