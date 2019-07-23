import './Filters.css'
import React, { useState } from 'react'
import { useStaticQuery, graphql } from 'gatsby'
import extractNodes from '../../helpers/extractNodes'
import Categories from './categories';
import Options from './options'
import getRegions from '../../helpers/getRegions'
import getStates from '../../helpers/getStates'
import getMedia from '../../helpers/getMedia'

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

const Filters = ({ filterArtists }) => {
  const data = useStaticQuery(filtersQuery)
  const [ activeCategory, setActiveCategory ] = useState(null)
  const [ activeOption, setActiveOption ] = useState({})
  const [ isOptionsOpen, setIsOptionsOpen ] = useState(false)
  const locations = extractNodes(data.allContentfulLocation)
  const states = getStates(locations)
  const regions = getRegions(locations)
  const media = getMedia(extractNodes(data.allContentfulMedium))
  const allOptions = getOptions(activeCategory, regions, states, media)
  const options = allOptions.map(o => ({ ...o, isActive: o.name === activeOption.name }))

  const handleOptionToggle = (categoryName, optionName, artistIds) => {
    setActiveOption({ category: categoryName, name: optionName })
    filterArtists(artistIds)
  }

  const handleCategoryClick = categoryName => {
    let openOptions = false

    if (activeCategory !== categoryName) {
      openOptions = true
    } else {
      openOptions = !isOptionsOpen
    }

    setActiveCategory(categoryName)
    setIsOptionsOpen(openOptions)
  }

  return (
    <div className='filters'>
      <Categories activeCategory={activeCategory} onCategoryClick={handleCategoryClick} />
      {isOptionsOpen && options.length > 0 && (
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
