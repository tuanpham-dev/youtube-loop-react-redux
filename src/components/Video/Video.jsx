import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import './Video.scss'
import YouTube from './YouTube'
import Button from '../Button/Button'
import { removeVideo, editVideo, playVideo, playNextVideo } from '../../actions/videoAction'
import timeFormat from '../../utils/timeFormat'
import Slider, { Range } from 'rc-slider'
import 'rc-slider/assets/index.css'

export const Video = ({ video, videos, playingVideo, removeVideo, editVideo, playVideo, playNextVideo }) => {
  const [player, setPlayer] = useState(null)
  const [videoLoaded, setVideoLoaded] = useState(false)
  const [duration, setDuration] = useState(0)
  const [title, setTitle] = useState('')
  const [playingStateChanged, setPlayingStateChanged] = useState(false)

  const canMove = videos.length > 1
  const isPlaying = playingVideo.id === video.id
  const className = 'video' + (isPlaying ? ' video--active' : '')

  const setVideoVolume = volume => {
    if (player) {
      player.setVolume(volume)
    }

    editVideo({
      ...video,
      volume
    })
  }

  const setVideoRange = range => {
    if (isPlaying && player) {
      const currentTime = player.getCurrentTime()

      if (range[0] > currentTime) {
        player.seekTo(range[0])
      }
    }

    editVideo({
      ...video,
      range
    })
  }

  const onVideoLoaded = (player) => {
    const duration = player.getDuration()
    setVideoLoaded(false)

    if (!duration) {
      removeVideo(video.id)
    } else {
      setPlayer(player)
      setDuration(duration)
      setTitle(player.getVideoData().title)

      if (video.volume === null || video.range[0] === null || video.range[1] === null) {
        editVideo({
          ...video,
          volume: player.getVolume(),
          range: [0, duration]
        })
      }

      if (isPlaying) {
        player.setVolume(video.volume)
        player.seekTo(video.range[0], true)
        player.playVideo()

        document.title = title + ' YouTube Loop in React Redux'
      }
    }

    setVideoLoaded(true)
  }

  const onPlaying = () => {
    if (!isPlaying) {
      playVideo(video.id)
    }
  }

  const onPaused = () => {

  }

  const onEnded = () => {
    playNextVideo()
    setPlayingStateChanged(true)
  }

  const onError = () => {
    removeVideo(video)
  }

  const trackStatus = () => {
    if (player) {
      const currentTime = player.getCurrentTime()
      const playerState = player.getPlayerState()
      const volume = player.getVolume()

      if (volume !== video.volume) {
        setVideoVolume(volume)
      }

      if (playerState === 1 && currentTime > video.range[1]) {
        onEnded()
      }
    }
  }

  useEffect(() => {
    const interval = setInterval(trackStatus, 500)
    return () => clearInterval(interval)
  })

  useEffect(() => {
    setPlayingStateChanged(true)

    return () => setPlayingStateChanged(false)
  }, [isPlaying])

  useEffect(() => {
    if (player && playingStateChanged) {
      setPlayingStateChanged(false)

      if (isPlaying) {
        player.setVolume(video.volume)
        player.seekTo(video.range[0], true)
        player.playVideo()

        document.title = title + ' YouTube Loop in React Redux'
      } else {
        player.pauseVideo()
        document.title = 'YouTube Loop in React Redux'
      }
    }
  }, [player, isPlaying, title, playingStateChanged, video.volume, video.range])

  return (
    <div className={className}>
      <div className="video__player">
        <YouTube youtubeId={video.youtubeId} onReady={onVideoLoaded} onPlaying={onPlaying} onPaused={onPaused} onEnded={onEnded} onError={onError} />
      </div>

      {videoLoaded &&
        <>
          <Slider className="video__volume-slider" vertical="true" value={video.volume} onChange={setVideoVolume} />
          <Range className="video__range-slider" max={duration} value={video.range} onChange={setVideoRange} />
          <div className="video__info">{`Volume: ${video.volume} — Range: ${timeFormat(video.range[0])} → ${timeFormat(video.range[1])}`}</div>
        </>
      }

      <div className="video__buttons">
        {canMove &&
          <Button className="video__move-handle">Move</Button>
        }
        <Button color="red" onClick={() => removeVideo(video.id)}>Remove Video</Button>
      </div>
    </div>
  )
}

const mapStateToProps = state => ({
  videos: state.videos,
  playingVideo: state.playingVideo
})

const mapDispatchToProps = dispatch => ({
  removeVideo: videoId => {
    dispatch(removeVideo(videoId))
  },
  editVideo: video => {
    dispatch(editVideo(video))
  },
  playVideo: videoId => {
    dispatch(playVideo(videoId))
  },
  playNextVideo: () => {
    dispatch(playNextVideo())
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(Video)
