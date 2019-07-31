import './Gallery.css'
import React from 'react'
import Image from 'gatsby-image'

const Gallery = ({ images }) => {
  return (
    <div className='gallery'>
      {images.map(image => (
        <div className='image-wrapper'>
          <Image className='image' alt={image.description} fluid={image.fluid} />
        </div>
      ))}
    </div>
  )
}

export default Gallery
