import './resources.css'
import React from 'react'
import { graphql, Link } from 'gatsby'
import { Helmet } from 'react-helmet'
import Page from '../../components/page'

const ResourcesPage = ({ data }) => {
  const page = data.contentfulResources
  console.log(page.resourcesList)
  return (
    <Page>
      <Helmet>
        <title>Resources | Filipino American Artist Directory</title>
        <meta property="description" content={page.metaDescription} />
        <meta property="og:url" content={`https://filamartistdirectory.com/resources`} />
        <meta property="og:title" content={`Resources | Filipino American Artist Directory`} />
      </Helmet>
      {page.resourcesList && page.resourcesList.length > 0 && (
        <ul className='resources'>
          {page.resourcesList.map(r => (
            <li key={r.url} className='resource'>
              <a href={r.url} target='_blank' rel='noreferrer noopener'>
                {r.urlText}
              </a>
              {r.description.description}
            </li>
          ))}
        </ul>
      )}
      <p>Have a resource to suggest? <Link to='/contact'>Get in touch.</Link></p>
    </Page>
  )
}

export const query = graphql`
  query ResourcesPage {
    contentfulResources {
      metaDescription
      resourcesList {
        url
        urlText
        description {
          description
        }
      }
    }
  }
`

export default ResourcesPage
