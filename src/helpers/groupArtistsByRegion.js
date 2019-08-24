const groupArtistsByRegion = (regions, region) => {
  if (!regions.length) {
    return regions.concat(region)
  }

  // Get last region
  const lastRegion = regions[regions.length - 1]

  // We have a new region
  if (lastRegion.name !== region.name) {
    return [...regions, region]
  }

  if (!region.artistIds) {
    return regions
  }

  let artistIds = []
  if (!lastRegion.artistIds) {
    artistIds = [...region.artistIds]
  } else {
    artistIds = [...lastRegion.artistIds, ...region.artistIds]
  }

  // Add region artists to last region
  const updatedRegions = JSON.parse(JSON.stringify(regions))
  updatedRegions[updatedRegions.length - 1].artistIds = artistIds

  return updatedRegions
}

export default groupArtistsByRegion
