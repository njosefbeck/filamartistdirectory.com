import './Header.css'
import React from 'react'
import Logo from '../logo'
import ArtistCount from '../artist-count'
import Nav from '../nav'

const Header = () => (
  <header>
    <div className='right'>
      <Nav />
    </div>
    <div className='left'>
      <Logo />
      <ArtistCount />
    </div>
    <hr />
  </header>
)

export default Header
