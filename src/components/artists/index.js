import './Artists.css'
import React from 'react'
import Artist from './artist';

const Artists = ({ artists }) => {
  if (!artists.length) {
    return (
      <ul className='artists'>No artists to display.</ul>
    )
  }

  return (
    <ul className='artists'>
      {artists.map(artist => (
        <Artist key={artist.id} {...artist} />
      ))}
    </ul>
  )
}

export default Artists
