import getArtistIds from "./getArtistIds"
import alphaSortByName from "./alphaSortByName"

const getAlphabet = contentfulMedia =>
  contentfulMedia
    .map(m => ({ name: m.text, artistIds: getArtistIds(m.artist) }))
    .sort(alphaSortByName)

export default getAlphabet
