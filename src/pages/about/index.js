import './about.css'
import React from 'react'
import { graphql } from 'gatsby'
import { Helmet } from 'react-helmet'
import Page from '../../components/page'
import { BLOCKS, INLINES } from '@contentful/rich-text-types'
import { documentToReactComponents } from '@contentful/rich-text-react-renderer'
import TeamMember from '../../components/team-member'
import Image from 'gatsby-image'

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
      {page.team && page.team.length > 0 && (
        <React.Fragment>
          <hr/>
          <ul className='team'>
            {page.team.map(member => (
              <TeamMember
                key={member.email}
                name={member.name}
                email={member.email}
                title={member.title}
                bio={member.bio ? member.bio.childMarkdownRemark.html : null}
                photo={<Image className='photo' alt={member.photo.description} fluid={member.photo.fluid} />}
              />
            ))}
          </ul>
        </React.Fragment>
      )}
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
      team {
        name
        email
        title
        bio {
          childMarkdownRemark {
            html
          }
        }
        photo {
          description
          fluid(maxWidth: 600) {
            ...GatsbyContentfulFluid_withWebp
          }
        }
      }
    }
  }
`

export default AboutPage
