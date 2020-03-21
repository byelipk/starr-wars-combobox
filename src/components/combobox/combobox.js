import React, { useState } from "react"

import AutosizeInput from "react-input-autosize"
import { useCombobox } from "downshift"

import _styles from "./combobox.module.scss"

const Combobox = () => {
  const [items, setItems] = useState([
    "Hello",
    "Goodbye",
    "Farewell",
    "So Long",
    "So",
    "Wonderful",
    "Fun things come all the time",
    "Memories",
  ])
  const [tokens, setTokens] = useState([])

  const {
    isOpen,
    reset,
    getLabelProps,
    getMenuProps,
    getInputProps,
    getComboboxProps,
    highlightedIndex,
    getItemProps,
  } = useCombobox({
    initialIsOpen: true,
    defaultIsOpen: true,
    items,
    onSelectedItemChange: changes => {
      const { selectedItem } = changes

      if (selectedItem) {
        setTokens(tokens => [...tokens, selectedItem])
        reset()
      }
    },
  })

  const removeToken = (index) => setTokens(tokens => tokens.filter((_, idx) => idx !== index))

  return (
    <div className={`${_styles.wrapper}`}>
      <label {...getLabelProps()}>Search the Star Wars Universe:</label>
      <div {...getComboboxProps({ className: _styles.combobox })}>
        {tokens.map((t, index) => (
          <button onClick={() => removeToken(index)} type="button" key={index} className={`${_styles.token}`}>
            {t}
          </button>
        ))}

        <AutosizeInput
          {...getInputProps()}
          inputClassName={`${_styles.input}`}
          placeholder={tokens.length > 0 ? "Type" : "Ex. Luke Skywalker"}
        />
      </div>

      <ul {...getMenuProps()} className={`${_styles.menu} ${isOpen ? _styles.menuOpen : ''}`}>
        {isOpen &&
          items.map((item, index) => (
            <li
              className={`${_styles.menuItem}`}
              style={
                highlightedIndex === index ? { backgroundColor: "#bde4ff" } : {}
              }
              key={`${item}${index}`}
              {...getItemProps({ item, index })}
            >
              {item}
            </li>
          ))}
      </ul>
    </div>
  )
}

export default Combobox
