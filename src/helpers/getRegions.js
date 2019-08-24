import getArtistIds from "./getArtistIds"
import alphaSortByName from "./alphaSortByName"
import groupArtistsByRegion from "./groupArtistsByRegion"

const getRegions = locations =>
  locations
    .map(l => ({ name: l.region, artistIds: getArtistIds(l.artist) }))
    .sort(alphaSortByName)
    .reduce(groupArtistsByRegion, [])

export default getRegions
