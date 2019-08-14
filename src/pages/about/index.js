import './about.css'
import React from 'react'
import { graphql } from 'gatsby'
import { Helmet } from 'react-helmet'
import Page from '../../components/page'
import { BLOCKS, INLINES } from '@contentful/rich-text-types'
import { documentToReactComponents } from '@contentful/rich-text-react-renderer'

const AboutPage = ({ data }) => {
  const page = data.contentfulAbout
  const options = {
    renderNode: {
      [BLOCKS.EMBEDDED_ASSET]: node => {
        const url = node.data.target.fields.file['en-US'].url
        const alt = node.data.target.fields.title
        return <img className='map-image' src={url} alt={alt} />
      },
      [INLINES.HYPERLINK]: node => {
        const url = node.data.uri
        const text = node.content[0].value
        return <a className='with-underline regular-weight' href={url} target='_blank' rel='noopener noreferrer'>{text}</a>
      }
    }
  }

  return (
    <Page>
      <Helmet>
        <title>About | Filipino American Artist Directory</title>
        <meta property="description" content={page.metaDescription} />
        <meta property="og:url" content={`https://filamartistdirectory.com/about`} />
        <meta property="og:title" content={`About | Filipino American Artist Directory`} />
      </Helmet>
      {documentToReactComponents(page.content.json, options)}
    </Page>
  )
}

export const query = graphql`
  query AboutPage {
    contentfulAbout {
      metaDescription
      content {
        json
      }
    }
  }
`

export default AboutPage
