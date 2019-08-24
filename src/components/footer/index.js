import './Footer.css'
import React from 'react'
import facebookIcon from '../../images/facebook.png'
import instagramIcon from '../../images/instagram.png'

const Footer = () => (
  <footer>
    <hr />
    <div className='footer-content'>
      <div className='copyright'>
        &copy; Filipino American Artist Directory. All images copyright to the respective artists.
      </div>
      <div className='social-media'>
        <a href='https://www.facebook.com/filamartistdirectory' target='_blank' rel='noopener noreferrer' className='social-media-icon'>
          <img src={facebookIcon} alt='Facebook Icon' />
        </a>
        <a href='https://www.instagram.com/filamartistdirectory/' target='_blank' rel='noopener noreferrer' className='social-media-icon'>
          <img src={instagramIcon} alt='Instagram Icon' />
        </a>
      </div>
    </div>
  </footer>
)

export default Footer
