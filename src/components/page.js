import '../normalize.css'
import '../global.css'
import React, { Fragment } from 'react'
import Logo from '../components/logo'

const Page = ({ children }) => (
  <Fragment>
    <header>
      <Logo />
    </header>
    <main>
      {children}
    </main>
    <footer>
      &copy; {new Date().getFullYear()} Filipino American Artist Directory. All images copyright to the respective artists.
    </footer>
  </Fragment>
)

export default Page
