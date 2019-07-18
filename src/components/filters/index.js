import './Filters.css'
import React, { useState } from 'react'
import { useStaticQuery, graphql } from 'gatsby'
import alphaSortByName from '../../helpers/alphaSortByName'
import extractNodes from '../../helpers/extractNodes'
import groupArtistsByRegion from '../../helpers/groupArtistsByRegion'
import Categories from './categories';
import Options from './options'

const filtersQuery = graphql`
  query FiltersQuery {
    allContentfulLocation {
      edges {
        node {
          id
          region
          state
          artist {
            id
          }
        }
      }
    }
    allContentfulMedium {
      edges {
        node {
          id
          name
          artist {
            id
          }
        }
      }
    }
  }
`

const getIds = artists => artists ? artists.map(a => a.id) : null

const getRegions = locations => locations
  .map(l => ({ name: l.region, artistIds: getIds(l.artist) }))
  .sort(alphaSortByName)
  .reduce(groupArtistsByRegion, [])

const getStates = locations => locations
  .map(l => ({ name: l.state, artistIds: getIds(l.artist) }))
  .sort(alphaSortByName)

const getMedia = contentfulMedia => contentfulMedia
  .map(m => ({ name: m.name, artistIds: getIds(m.artist) }))
  .sort(alphaSortByName)

const getOptions = (category, regions, states, media) => {
  switch (category) {
    case 'Region':
      return regions
    case 'State':
      return states
    case 'Media':
      return media
    default:
      return []
  }
}

const toggleOption = (activeCategoryOptions, optionName) => {
  if (activeCategoryOptions.includes(optionName)) {
    return activeCategoryOptions.filter(name => name !== optionName )
  } 
  
  return [ ...activeCategoryOptions, optionName ]
}

const setIsActive = (category, options, name) => {
  if (!category) return false
  return options[category].includes(name)
}

const Filters = ({ filterArtists }) => {
  const data = useStaticQuery(filtersQuery)
  const [ activeCategory, setActiveCategory ] = useState(null)
  const [ activeOptions, setActiveOptions ] = useState({
    Region: [],
    State: [],
    Media: [],
  })
  const locations = extractNodes(data.allContentfulLocation)
  const states = getStates(locations)
  const regions = getRegions(locations)
  const media = getMedia(extractNodes(data.allContentfulMedium))
  const allOptions = getOptions(activeCategory, regions, states, media)
  const options = allOptions.map(o => ({
    ...o,
    isActive: setIsActive(activeCategory, activeOptions, o.name), 
  }))

  const handleOptionToggle = (categoryName, optionName, artistIds) => {
    setActiveOptions({
      ...activeOptions,
      [categoryName]: toggleOption(activeOptions[categoryName], optionName),
    })
    filterArtists(categoryName, artistIds)
  }

  return (
    <div className='filters'>
      <Categories activeCategory={activeCategory} setActiveCategory={setActiveCategory} />
      {options.length > 0 && (
        <Options
          category={activeCategory}
          toggleOption={handleOptionToggle}
          options={options}
        />
      )}
    </div>
  )
}

export default Filters
