import { useEffect } from "react"

import { fetchReducer, initialState } from "./useFetch"

import useThunkReducer from "./useThunkReducer"

export const peopleEndpoint = "https://swapi.co/api/people/"

// See: https://swapi.co/documentation
export const fetchStarWarsResults = url => {
  return dispatch => {
    dispatch({ type: "LOADING" })

    fetch(url)
      .then(response => response.json())
      .then(response => {
        dispatch({
          type: "RESPONSE_COMPLETE",
          payload: { response: response.results },
        })
      })
      .catch(error => {
        dispatch({ type: "ERROR", payload: { error } })
      })
  }
}

export const useStarWarsApi = url => {
  const [state, dispatch] = useThunkReducer(fetchReducer, initialState)

  useEffect(() => {
    if (Boolean(url)) {
      dispatch(fetchStarWarsResults(url))
    }
  }, [url, dispatch])

  return [state.response, state.loading, state.error]
}
