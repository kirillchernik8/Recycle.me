import {
	gql
} from 'apollo-boost'


const addToFav = gql `
mutation addPlace($address: String!, $latitude: String!, $longitude: String!) {
	addPlace(address:$address,latitude: $latitude, longitude: $longitude ){
		address
		latitude
		longitude
	 }
  }
  `
const getFavs = gql `
{
	places {
		address
		latitude
		longitude
	}
}
`
export {
	addToFav,
	getFavs
}