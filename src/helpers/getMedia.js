import getArtistIds from './getArtistIds'
import alphaSortByName from './alphaSortByName'

const getMedia = contentfulMedia => contentfulMedia
  .map(m => ({ name: m.name, artistIds: getArtistIds(m.artist) }))
  .sort(alphaSortByName)

export default getMedia