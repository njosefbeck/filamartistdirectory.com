import './Artist.css'
import React from 'react'
import { Link } from 'gatsby'
import Image from 'gatsby-image'

const renderImage = (name, imageThumbnail) => {
  if (!imageThumbnail) {
    return <img className='image' src='https://via.placeholder.com/400' alt={name} />
  }

  return <Image className='image' alt={imageThumbnail.description} fluid={imageThumbnail.fluid} />
}

const Artist = ({ name, slug, imageThumbnail, gallery }) => (
  <li className='artist'>
    <Link to={`/artists/${slug}`}>
      {renderImage(name, imageThumbnail)}
    </Link>
    <div className='name'>
      <Link to={`/artists/${slug}`}>
        {name}
      </Link>
    </div>
  </li>
)

export default Artist

