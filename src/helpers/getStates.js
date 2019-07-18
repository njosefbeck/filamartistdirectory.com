import getArtistIds from './getArtistIds'
import alphaSortByName from './alphaSortByName'

const getStates = locations => locations
  .map(l => ({ name: l.state, artistIds: getArtistIds(l.artist) }))
  .sort(alphaSortByName)

export default getStates
