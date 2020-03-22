import useFetch from "./useFetch"

export const peopleEndpoint = "https://swapi.co/api/people/"

export const getSearchPeopleEndpoint = value => `${peopleEndpoint}?search=${value}`

// See: https://swapi.co/documentation
export const useStarWarsApi = url => {
  const [response, loading, error] = useFetch(url)

   const results = (response && response.results) || []

  return [results, loading, error]
}
