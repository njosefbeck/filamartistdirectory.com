import './Filters.css'
import React from 'react'
import { useStaticQuery, graphql } from 'gatsby'
import extractNodes from '../../helpers/extractNodes'

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

  const locations = extractNodes(data.allContentfulLocation)
  const media = extractNodes(data.allContentfulMedium)

  console.log(locations)

  return (
    <div className='filters'>
      <ul className='categories'>
        <li className='category active'>
          Region
        </li>
        <li className='spacer'>/</li>
        <li className='category'>
          State
        </li>
      </ul>
      <ul className='options'>
        <li className='option'>
          West
        </li>
        <li className='spacer'>/</li>
        <li className='option active'>
          East
        </li>
        <li className='spacer'>/</li>
        <li className='option'>
          Midwest
        </li>
      </ul>
    </div>
  )
}

export default Filters
