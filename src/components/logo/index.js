import './Logo.css'
import { Link } from 'gatsby'
import React from 'react'

const Logo = () => (
  <h1 className='logo'>
    <Link to='/'>
      Filipino American Artist Directory
    </Link>
  </h1>
)

export default Logo