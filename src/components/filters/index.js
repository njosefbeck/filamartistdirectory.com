import './Filters.css'
import React, { useState } from 'react'
import { useStaticQuery, graphql } from 'gatsby'
import extractNodes from '../../helpers/extractNodes'
import groupArtistsByRegion from '../../helpers/groupArtistsByRegion'
import Categories from './categories';

const Filters = () => {
  const data = useStaticQuery(graphql`
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
  `)

  const [ activeCategory, setActiveCategory ] = useState(null)

  const locations = extractNodes(data.allContentfulLocation)

  console.log(locations)

  const regions = locations
    .map(l => ({ name: l.region, artists: l.artist }))
    .sort((a, b) => a.name - b.name)
    .reduce(groupArtistsByRegion, [])
    
  const media = extractNodes(data.allContentfulMedium)

  console.log(regions)

  return (
    <div className='filters'>
      <Categories activeCategory={activeCategory} setActiveCategory={setActiveCategory} />
      <ul className='options'>
        <li className='option'>
          West
        </li>
        <li className='option active'>
          East
        </li>
        <li className='option'>
          Midwest
        </li>
      </ul>
    </div>
  )
}

export default Filters
