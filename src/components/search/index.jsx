import './Search.css'
import React from 'react'

const Search = ({ doSearch }) => {
  return (
    <input
      className='search'
      onChange={doSearch}
      type='text'
      placeholder='Search for artist by name...'
    />
  )
}

export default Search
