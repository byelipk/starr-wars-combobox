import useFetch from "./useFetch"

export const peopleEndpoint = "https://swapi.co/api/people/"

export const getSearchPeopleEndpoint = value => {
  const trimmed = value.trim()
  return Boolean(trimmed) ? `${peopleEndpoint}?search=${trimmed}` : ""
}

// See: https://swapi.co/documentation
export const useStarWarsApi = url => {
  const [response, loading, error] = useFetch(url)

  const results = (response && response.results) || []

  return [results, loading, error]
}
