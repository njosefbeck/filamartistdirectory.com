const groupArtistsByRegion = (regions, region) => {
  if (!regions.length) {
    return regions.concat(region)
  }

  // Get last region
  const lastRegion = regions[regions.length - 1]

  // We have a new region
  if (lastRegion.name !== region.name) {
    return [ ...regions, region]
  }

  if (!region.artists) {
    return regions
  }

  let artists = []
  if (!lastRegion.artists) {
    artists = [ ...region.artists ] 
  } else {
    artists = [ ...lastRegion.artists, ...region.artists ]
  }

  // Add region artists to last region
  const updatedRegions = JSON.parse(JSON.stringify(regions))
  updatedRegions[updatedRegions.length - 1].artists = artists

  return updatedRegions
}

export default groupArtistsByRegion
