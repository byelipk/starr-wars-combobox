import React from "react"

import Combobox from "../components/combobox/combobox"

import _styles from "../components/combobox/combobox.module.scss"

const IndexPage = () => (
  <div className={`${_styles.layout}`}>
    <div className={`${_styles.hero}`}>
      <h1>Here's an autocomplete</h1>
      <Combobox />
    </div>
  </div>
)

export default IndexPage
