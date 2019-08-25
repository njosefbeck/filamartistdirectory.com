import './Header.css'
import React from 'react'
import Logo from '../logo'
import ArtistCount from '../artist-count'
import Nav from '../nav'

const Header = () => (
  <header>
    <div className='header-content'>
      <div className='right'>
        <Nav />
      </div>
      <div className='left'>
        <Logo />
        <ArtistCount />
      </div>
    </div>
  </header>
)

export default Header
