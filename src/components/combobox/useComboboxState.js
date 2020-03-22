import { useState, useRef } from "react"

export const useComboboxState = inputRef => {
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

  const handleTokenClick = index => {
    setTokens(tokens => {
      const remainingTokens = tokens.filter((_, idx) => idx !== index)

      if (remainingTokens.length > 0) {
        const clickedTowardsFrontOfList = index < tokens.length - 1
        if (clickedTowardsFrontOfList) {
          focusToken(index)
        } else {
          focusToken(index - 1)
        }
      } else {
        focusInput()
      }

      return remainingTokens
    })
  }

  const focusInput = () => inputRef.current && inputRef.current.focus()

  // Browser behavior that takes you to previous page when you press the 
  // `backspace` key. Google it. So annoying...
  const preventTheBackspaceMeansBackspaceProblem = e => e.preventDefault()

  const handleTokenKeyDown = (e, index) => {

    if (e.key === "Backspace") {
      preventTheBackspaceMeansBackspaceProblem(e)

      handleTokenClick(index)
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
    const value = e.target.value

    if (value === "") {
      if (e.key === "Backspace") {

        preventTheBackspaceMeansBackspaceProblem(e)

        focusToken(tokens.length - 1)
      }

      if (e.key === "ArrowLeft") {
        focusToken(tokens.length - 1)
      }

      if (e.key === "ArrowRight") {
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
    handleTokenClick,
    handleTokenKeyDown,
    handleInputKeyDown,
  }
}
