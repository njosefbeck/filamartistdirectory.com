import React, { useState } from 'react'
import { navigate } from 'gatsby-link'
import { graphql } from 'gatsby'
import { Helmet } from 'react-helmet'
import Page from '../../components/page'
import { INLINES } from '@contentful/rich-text-types'
import { documentToReactComponents } from '@contentful/rich-text-react-renderer'

function encode(data) {
  return Object.keys(data)
    .map((key) => encodeURIComponent(key) + '=' + encodeURIComponent(data[key]))
    .join('&')
}

const ContactPage = ({ data }) => {
  const [ formBody, setFormBody ] = useState({})
  const page = data.contentfulContact
  const options = {
    renderNode: {
      [INLINES.HYPERLINK]: node => {
        const url = node.data.uri
        const text = node.content[0].value
        return <a className='with-underline regular-weight' href={url} target='_blank' rel='noopener noreferrer'>{text}</a>
      }
    }
  }

  const handleChange = (e) => {
    setFormBody({ ...formBody, [e.target.name]: e.target.value })
  }

  const handleSubmit = e => {
    e.preventDefault()
    const form = e.target
    fetch('/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: encode({
        'form-name': form.getAttribute('name'),
        ...formBody,
      }),
    })
      .then(() => navigate(form.getAttribute('action')))
      .catch((error) => alert(error))
  }

  return (
    <Page>
      <Helmet>
        <title>Contact | Filipino American Artist Directory</title>
        <meta name="description" content={page.metaDescription} />
        <meta property="og:url" content={`https://filamartistdirectory.com/contact`} />
        <meta property="og:title" content={`Contact | Filipino American Artist Directory`} />
      </Helmet>
      {documentToReactComponents(page.content.json, options)}
      <form
        name="Contact Form"
        method="POST"
        action="/thanks/"
        data-netlify="true"
        data-netlify-honeypot="bot-field"
        onSubmit={handleSubmit}
      >
        <div className="form-element">
          <label for="first-name">Name *</label>
          <input type="text" name="name" required onChange={handleChange} />
        </div>
        <div className="form-element">
          <label for="email">Email Address *</label>
          <input type="email" name="email" required onChange={handleChange} />
        </div>
        <div className="form-element">
          <label for="subject">Subject *</label>
          <input type="text" name="subject" required onChange={handleChange} />
        </div>
        <div className="form-element">
          <label for="message">Message *</label>
          <textarea name="message" required onChange={handleChange}></textarea>
        </div>
        <div className="form-element">
          <button type="submit">Send</button>
        </div>
      </form>
    </Page>
  )
}

export const query = graphql`
  query ContactPage {
    contentfulContact {
      metaDescription
      content {
        json
      }
    }
  }
`

export default ContactPage
