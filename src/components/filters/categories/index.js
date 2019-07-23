import './Categories.css'
import React from 'react'

const Category = ({ isActive, name, onCategoryClick }) => {
  return (
    <li
      className={isActive ? 'category active' : 'category'}
      onClick={() => onCategoryClick(name)}
    >
      {name}
    </li>
  )
}

const Categories = ({ activeCategory, onCategoryClick }) => {
  const names = ['ABC', 'Region', 'State', 'Media']

  return (
    <ul className='categories'>
      {names.map(name => (
        <Category
          isActive={activeCategory === name}
          key={name}
          name={name}
          onCategoryClick={onCategoryClick}
        />
      ))}
    </ul>
  )
}

export default Categories
