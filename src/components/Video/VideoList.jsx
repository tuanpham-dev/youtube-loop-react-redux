import React from 'react'
import './VideoList.scss'
import { ReactSortable } from 'react-sortablejs'
import Video from './Video'
import { connect } from 'react-redux'
import { updateVideos } from '../../actions/videoAction'

const VideoList = ({ videos, updateVideos }) => {
  if (!videos.length) {
    return null
  }

  return (
    <ReactSortable tag="ul" list={videos} setList={updateVideos} handle=".video__move-handle" className="video-list">
      {videos.map(video => (
        <li key={video.id} className="video-item">
          <Video video={video} />
        </li>
      ))}
    </ReactSortable>
  )
}

const mapStateToProps = state => ({
  videos: state.videos
})

const mapDispatchToProps = dispatch => ({
  updateVideos: videos => {
    dispatch(updateVideos(videos))
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(VideoList)
