import fetch from "isomorphic-fetch"

import { useEffect, useReducer } from "react"

export const initialState = {
  response: null,
  loading: false,
  error: null,
}

export const fetchReducer = (state, action) => {
  if (action.type === "LOADING") {
    return {
      response: null,
      loading: true,
      error: null,
    }
  }

  if (action.type === "RESPONSE_COMPLETE") {
    return {
      response: action.payload.response,
      loading: false,
      error: null,
    }
  }

  if (action.type === "ERROR") {
    return {
      response: null,
      loading: false,
      error: action.payload.error,
    }
  }

  return state
}

const useFetch = url => {
  const [state, dispatch] = useReducer(fetchReducer, initialState)

  useEffect(() => {
    if (url) {
      dispatch({ type: "LOADING" })

      fetch(url)
        .then(response => response.json())
        .then(response => {
          dispatch({
            type: "RESPONSE_COMPLETE",
            payload: { response: response },
          })
        })
        .catch(error => {
          dispatch({ type: "ERROR", payload: { error } })
        })
    }
  }, [url])

  return [state.response, state.loading, state.error]
}

export default useFetch
