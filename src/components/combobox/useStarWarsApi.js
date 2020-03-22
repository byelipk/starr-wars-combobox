import useFetch from "./useFetch"

export const peopleEndpoint = "https://swapi.co/api/people/"

// See: https://swapi.co/documentation
export const useStarWarsApi = url => {
  const [response, loading, error] = useFetch(url)

   const results = (response && response.results) || []

  return [results, loading, error]
}
