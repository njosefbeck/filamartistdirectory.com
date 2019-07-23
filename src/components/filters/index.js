import './Filters.css'
import React, { useState } from 'react'
import { useStaticQuery, graphql } from 'gatsby'
import extractNodes from '../../helpers/extractNodes'
import Categories from './categories';
import Options from './options'
import getAlphabet from '../../helpers/getAlphabet'
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
    allContentfulLetter {
      edges {
        node {
          text
          artist {
            id
          }
          id
        }
      }
    }
  }
`

const getOptions = (category, regions, states, media, alphabet) => {
  switch (category) {
    case 'Region':
      return regions
    case 'State':
      return states
    case 'Media':
      return media
    case 'ABC':
      return alphabet
    default:
      return []
  }
}

const Filters = ({ filterArtists }) => {
  const data = useStaticQuery(filtersQuery)
  const [ activeCategory, setActiveCategory ] = useState(null)
  const [ activeOption, setActiveOption ] = useState({})
  const [ isOptionsOpen, setIsOptionsOpen ] = useState(false)
  const alphabet = getAlphabet(extractNodes(data.allContentfulLetter))
  const states = getStates(extractNodes(data.allContentfulLocation))
  const regions = getRegions(extractNodes(data.allContentfulLocation))
  const media = getMedia(extractNodes(data.allContentfulMedium))
  const activeCategoryOptions = getOptions(activeCategory, regions, states, media, alphabet)
  const options = activeCategoryOptions
    .map(o => ({ ...o, isActive: o.name === activeOption.name }))

  const handleOptionToggle = (categoryName, optionName, artistIds) => {
    let ids = []
    let option = {}

    // User has clicked on a different option, so
    // need to update state accordingly
    if (optionName !== activeOption.name) {
      ids = artistIds
      option = { category: categoryName, name: optionName }
    }

    setActiveOption(option)
    filterArtists(ids)
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
