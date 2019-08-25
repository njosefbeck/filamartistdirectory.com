import './Header.css'
import React from 'react'
import Logo from "../logo"
import ArtistCount from "../artist-count"

const Header = () => (
  <header>
    <Logo />
    <ArtistCount />
    <hr />
  </header>
)

export default Header
