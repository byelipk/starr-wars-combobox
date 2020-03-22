import React, { useState, useRef, createRef } from "react"

import AutosizeInput from "react-input-autosize"
import { useCombobox } from "downshift"
import { useComboboxState } from "./useComboboxState"

import { useStarWarsApi, getSearchPeopleEndpoint } from "./useStarWarsApi"

import _styles from "./combobox.module.scss"

const Combobox = () => {
  const [endpoint, setEndpoint] = useState("")
  const [items, loading] = useStarWarsApi(endpoint)

  const inputRef = useRef(null)
  const setInputRef = el => (inputRef.current = el)

  const {
    tokens,
    setTokens,
    setTokenRef,
    focusInput,
    handleTokenClick,
    handleInputKeyDown,
    handleTokenKeyDown
  } = useComboboxState(inputRef)

  const {
    isOpen,
    reset,
    openMenu,
    getLabelProps,
    getMenuProps,
    getInputProps,
    getComboboxProps,
    highlightedIndex,
    getItemProps,
  } = useCombobox({
    items,
    itemToString: item => {
      return item == null ? "" : item.name
    },
    onInputValueChange: ({ inputValue }) => {
      if (!loading) {
        setEndpoint(getSearchPeopleEndpoint(inputValue))
      }
    },
    onSelectedItemChange: changes => {
      const { selectedItem } = changes

      if (selectedItem && !tokens.includes(selectedItem.name)) {
        setTokens(tokens => [...tokens, selectedItem.name])
        reset()
        focusInput()
      }
    },
  })

  return (
    <div className={`${_styles.wrapper}`}>
      <label {...getLabelProps()}>Search the Star Wars Universe:</label>
      <div
        {...getComboboxProps({ className: _styles.combobox })}
        onClick={focusInput}
      >
        {tokens.map((t, index) => (
          <button
            ref={el => setTokenRef(el, index)}
            onClick={() => handleTokenClick(index)}
            onKeyDown={e => handleTokenKeyDown(e, index)}
            type="button"
            key={index}
            className={`${_styles.token}`}
          >
            {t}
          </button>
        ))}

        <AutosizeInput
          {...getInputProps({
            onFocus: openMenu,
            onKeyDown: handleInputKeyDown,
          })}
          inputRef={setInputRef}
          inputClassName={`${_styles.input}`}
          placeholder={
            tokens.length > 0 ? "Use the Force..." : "Ex. Luke Skywalker"
          }
        />
      </div>

      <ul
        {...getMenuProps()}
        className={`${_styles.menu} ${
          isOpen || loading ? _styles.menuOpen : ""
        }`}
      >
        {loading && <li className={`${_styles.menuItem}`}>Loading...</li>}
        {isOpen &&
          items.map((item, index) => (
            <li
              className={`${_styles.menuItem}`}
              style={
                highlightedIndex === index ? { backgroundColor: "#bde4ff" } : {}
              }
              key={`${item.name}${index}`}
              {...getItemProps({ item, index })}
            >
              {item.name}
            </li>
          ))}
      </ul>
    </div>
  )
}

export default Combobox
