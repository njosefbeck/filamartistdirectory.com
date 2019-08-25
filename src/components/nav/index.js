import './Nav.css'
import React, { useState } from 'react'
import { Link } from 'gatsby'

const Nav = () => {
  const [isMenuOpen, setIsMenuOpen ] = useState(false)

  const toggleMenu = e => {
    e.preventDefault()
    setIsMenuOpen(!isMenuOpen)
  }
  return (
    <nav>
      <ul className={`nav-list${isMenuOpen ? ' opened' : ''}`}>
        <li className='nav-list-item'>
          <Link to='/about'>
            About
          </Link>
        </li>
        <li className='nav-list-item'>
          <Link to='/submissions'>
            Submissions
          </Link>
        </li>
        <li className='nav-list-item'>
          <Link to='/resources'>
            Resources
          </Link>
        </li>
        <li className='nav-list-item'>
          <Link to='/contact'>
            Contact
          </Link>
        </li>
      </ul>
      <button className='menu-button' onClick={toggleMenu}>Menu</button>
    </nav>
  )
}

export default Nav
