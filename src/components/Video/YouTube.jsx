import React, { useRef, useEffect } from 'react'
import loadYouTubeAPI from '../../utils/loadYouTubeAPI'

const YouTube = ({ youtubeId, onReady, onPlaying, onPaused, onEnded, onError }) => {
  const container = useRef(null)

  useEffect(() => {
    loadYouTubeAPI().then(YT => {
      if (container.current) {
        const player = new YT.Player(container.current, {
          videoId: youtubeId,
          events: {
            onReady: () => onReady(player),
            onError: onError,
            onStateChange: event => {
              if (event.data === YT.PlayerState.PLAYING) {
                onPlaying()
              } else if (event.data === YT.PlayerState.PAUSED) {
                onPaused()
              } else if (event.data === YT.PlayerState.ENDED) {
                onEnded()
              }
            }
          }
        })
      }
    })
  })

  return (
    <div ref={container}></div>
  )
}

export default YouTube
