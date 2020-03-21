import React, { useState, useEffect } from "react"

import AutosizeInput from "react-input-autosize"
import { useCombobox } from "downshift"

import _styles from "./combobox.module.scss"

const peopleEndpoint = "https://swapi.co/api/people/"

const useFetch = url => {
  const [response, setResponse] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  useEffect(() => {
    if (!url) return

    setLoading(true)
    setResponse(null)
    setError(false)

    fetch(url)
      .then(resp => resp.json())
      .then(resp => {
        setLoading(false)
        setResponse(resp)
      })
      .catch(error => {
        setError(error)
        setLoading(false)
      })
  }, [url])

  return [response, loading, error]
}
const Combobox = () => {
  const [endpoint, setEndpoint] = useState(peopleEndpoint + "?search=darth")
  const [response, loading, error] = useFetch(endpoint)
  const items = (response && response.results) || []

  const [tokens, setTokens] = useState([])

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
    // initialIsOpen: true,
    // defaultIsOpen: true,
    items,
    itemToString: (item) => {
      return item == null ? "" : item.name
    },
    onInputValueChange: ({ inputValue }) => {
      if (!loading) {
        setEndpoint(`${peopleEndpoint}?search=${inputValue}`)
      }
    },
    onSelectedItemChange: changes => {
      const { selectedItem } = changes

      if (selectedItem) {
        setTokens(tokens => [...tokens, selectedItem.name])
        reset()
      }
    },
  })

  const removeToken = index =>
    setTokens(tokens => tokens.filter((_, idx) => idx !== index))

  return (
    <div className={`${_styles.wrapper}`}>
      <label {...getLabelProps()}>Search the Star Wars Universe:</label>
      <div {...getComboboxProps({ className: _styles.combobox })}>
        {tokens.map((t, index) => (
          <button
            onClick={() => removeToken(index)}
            type="button"
            key={index}
            className={`${_styles.token}`}
          >
            {t}
          </button>
        ))}

        <AutosizeInput
          {...getInputProps({ 
            onFocus: openMenu 
          })}
          inputClassName={`${_styles.input}`}
          placeholder={
            tokens.length > 0 ? "Use the Force..." : "Ex. Luke Skywalker"
          }
        />
      </div>

      <ul
        {...getMenuProps()}
        className={`${_styles.menu} ${isOpen || loading ? _styles.menuOpen : ""}`}
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
