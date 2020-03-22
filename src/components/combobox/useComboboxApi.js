import { useState, useRef } from "react"

export const useComboboxApi = (inputRef) => {
  const [tokens, setTokens] = useState([])
  const tokenRefMap = useRef(new Map())

  const setTokenRef = (el, index) => tokenRefMap.current.set(index, el)

  const focusToken = index => {
    if (tokenRefMap.current) {
      const valueMap = tokenRefMap.current.values()
      const refs = Array.from(valueMap).filter(el => el !== null)
      const ref = refs[index]

      if (ref) {
        ref.focus()
      }
    }
  }

  const removeToken = index => {
    setTokens(tokens => tokens.filter((_, idx) => idx !== index))
    focusInput()
  }

  const focusInput = () => inputRef.current && inputRef.current.focus()

  const handleTokenKeyDown = (e, index) => {
    if (e.key === "Backspace") {
      removeToken(index)
    }

    if (e.key === "ArrowLeft") {
      if (index === 0) {
        focusInput()
      } else {
        focusToken(index - 1)
      }
    }

    if (e.key === "ArrowRight") {
      if (index + 1 >= tokens.length) {
        focusInput()
      } else {
        focusToken(index + 1)
      }
    }
  }

  const handleInputKeyDown = e => {
    if (e.target.value === "") {
      if (e.key === "Backspace" || e.key === "ArrowLeft") {
        focusToken(tokens.length - 1)
      }
  
      if (inputRef.current.value === "" && e.key === "ArrowRight") {
        focusToken(0)
      }
    }
  }

  return {
    setTokenRef,
    tokens,
    setTokens,
    focusToken,
    focusInput,
    removeToken,
    handleTokenKeyDown,
    handleInputKeyDown,
  }
}
