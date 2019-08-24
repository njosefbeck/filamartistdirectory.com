import React from "react"
import { Helmet } from "react-helmet"
import Page from "../components/page"

const Thanks = () => {
  return (
    <Page>
      <Helmet>
        <title>
          Thanks for the submission! | Filipino American Artist Directory
        </title>
      </Helmet>
      <div>Form submission successful!</div>
    </Page>
  )
}

export default Thanks
