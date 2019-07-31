import './Videos.css'
import React from 'react'

const getEmbed = (id, title, type) => {
  if (type === 'Vimeo') {
    return (
      <React.Fragment>
        <iframe
          title={title}
          src={`https://player.vimeo.com/video/${id}`}
          frameBorder='0'
          allowFullScreen
          allow='fullscreen'
        />
        <script src="https://player.vimeo.com/api/player.js" />
      </React.Fragment>
    )
  }

  return (
    <iframe
      title={title}
      src={`https://www.youtube.com/embed/${id}`}
      frameBorder='0'
      allowFullScreen
      allow='accelerometer; encrypted-media; gyroscope; picture-in-picture'
    />
  )
}

const Video = ({ id, title, embedType }) => (
  <div className='video'>
    <div className='embed-container'>
      {getEmbed(id, title, embedType)}
    </div>
  </div>
)


const Videos = ({ videos }) => (
  <div className='videos'>
    {videos.map(video => (
      <Video key={video.id} id={video.contentfulid} title={video.title} embedType={video.embedType} />
    ))}
  </div>
)

export default Videos
