import './Artist.css'
import React from 'react'
import { Link } from 'gatsby'

const Artist = ({ name, slug, imageThumbnail, gallery }) => {
  return (
    <li className='artist'>
      <Link to={`/artists/${slug}`}>
        <img className='image' src='https://via.placeholder.com/400' alt={name} />
      </Link>
      <div className='name'>
        <Link to={`/artists/${slug}`}>
          {name}
        </Link>
      </div>
    </li>
  )
}

export default Artist

