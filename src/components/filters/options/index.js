import './Options.css'
import React, {useState } from 'react'

const Option = ({ isActive, artistIds, category, name, toggleOption }) => {
  if (!artistIds) {
    return <li className='option disabled'>{name}</li>
  }

  const className = isActive ? 'option active' : 'option'

  const handleClick = evt => {
    evt.preventDefault()
    toggleOption(category, name, artistIds)
  }

  return (
    <li className={className} onClick={handleClick}>{name}</li>
  )
}

const Options = ({ category, toggleOption, options }) => {
  return (
    <ul className='options'>
      {options.map(option => (
        <Option
          key={option.name}
          isActive={option.isActive}
          artistIds={option.artistIds}
          category={category}
          name={option.name}
          toggleOption={toggleOption}
        />
      ))}
    </ul>
  )
}

export default Options
