import './Categories.css'
import React from 'react'

const Category = ({ isActive, name, setActiveCategory }) => {
  return (
    <li
      className={isActive ? 'category active' : 'category'}
      onClick={() => setActiveCategory(name)}
    >
      {name}
    </li>
  )
}

const Categories = ({ activeCategory, setActiveCategory }) => {
  const names = ['Region', 'State']

  return (
    <ul className='categories'>
      {names.map(name => (
        <Category
          isActive={activeCategory === name}
          key={name}
          name={name}
          setActiveCategory={setActiveCategory}
        />
      ))}
    </ul>
  )
}

export default Categories
