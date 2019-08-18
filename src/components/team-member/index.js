import './TeamMember.css'
import React from 'react'

const TeamMember = ({ name, email, title, bio, photo }) => (
  <li className='team-member'>
    <div className='photo-wrapper'>
      {photo}
    </div>
    <div className='text-wrapper'>
      <h3 className='name'>{name}</h3>
      <h4 className='title'>{title}</h4>
      <p className='bio' dangerouslySetInnerHTML={{ __html: bio }} />
      <p className='email'>{email}</p>
    </div>
  </li>
)

export default TeamMember
