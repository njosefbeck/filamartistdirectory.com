import React from 'react'
import { graphql } from 'gatsby'
import { Helmet } from 'react-helmet'
import Page from '../../components/page'
import { INLINES } from '@contentful/rich-text-types'
import { documentToReactComponents } from '@contentful/rich-text-react-renderer'

const SubmissionsPage = ({ data }) => {
  const page = data.contentfulSubmissions
  const options = {
    renderNode: {
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
        <title>Submissions | Filipino American Artist Directory</title>
        <meta name="description" content={page.metaDescription} />
        <meta property="og:url" content={`https://filamartistdirectory.com/submissions`} />
        <meta property="og:title" content={`Submissions | Filipino American Artist Directory`} />
      </Helmet>
      {documentToReactComponents(page.content.json, options)}
    </Page>
  )
}

export const query = graphql`
  query SubmissionsPage {
    contentfulSubmissions {
      metaDescription
      content {
        json
      }
    }
  }
`

export default SubmissionsPage
