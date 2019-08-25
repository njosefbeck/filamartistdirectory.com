import "../normalize.css"
import "../global.css"
import React, { Fragment } from "react"
import { Helmet } from "react-helmet"
import Footer from "./footer"
import Header from "./header";

const Page = ({ children }) => {
  return (
    <Fragment>
      <Helmet>
        <title>Filipino American Artist Directory</title>
        <meta property="og:url" content={`https://filamartistdirectory.com`} />
        <meta property="og:type" content={`website`} />
        <meta
          property="og:title"
          content={`Filipino American Artist Directory`}
        />
        <meta
          property="og:description"
          content={`Filipino American Artist Directory is an independent initiative by St. Louis-based artist Janna Añonuevo Langholz to connect and make visible the broad community of visual artists of Filipino heritage living and working in the United States. It aims to increase the recognition of Filipino American artists through an online resource and series of publications, as well as group events, exhibitions, commissioned works, and collaborations with other artists and organizations.`}
        />
      </Helmet>
      <Header />
      <main>{children}</main>
      <Footer />
    </Fragment>
  )
}

export default Page
