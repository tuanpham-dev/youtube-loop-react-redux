import React, { useState } from 'react'
import { connect } from 'react-redux'
import './Header.scss'
import Button from '../Button/Button'
import { addVideoByYouTubeId, playFirstVideo, stopVideo, playNextVideo, playPreviousVideo } from '../../actions/videoAction'

const Header = ({ videos, playingVideo, onAddButtonClick, onPlayButtonClick, onStopButtonClick, onNextButtonClick, onPreviousButtonClick }) => {
  const [input, setInput] = useState('')

  const videosCount = videos.length
  const isPlaying = playingVideo.id !== null
  const canPlayNextPrev = isPlaying && videosCount > 1

  return (
    <header className="header">
      <div className="container">
        <a href="/" className="header__logo">YouTube Loop</a>
        
        {videosCount > 0 &&
          <div className="header__controls">
            {isPlaying ?
              <Button onClick={onStopButtonClick}>Stop</Button>
              :
              <Button onClick={onPlayButtonClick}>Play</Button>
            }

            {canPlayNextPrev &&
              <>
                <Button onClick={onPreviousButtonClick}>Previous</Button>
                <Button onClick={onNextButtonClick}>Next</Button>
              </>
            }
          </div>
        }

        <div className="header__input-group">
          <input type="text" className="header__input"
            placeholder="Enter YouTube URL or Video ID"
            value={input}
            onChange={event => setInput(event.target.value)}
          />
          <div className="header__input-group-append">
            <Button color="blue" onClick={() => onAddButtonClick(input)}>Go Loop!</Button>
          </div>
        </div>      
      </div>
    </header>
  )
}

const mapStateToProps = state => ({
  videos: state.videos,
  playingVideo: state.playingVideo
})

const mapDispatchToProps = dispatch => ({
  onAddButtonClick: input => {
    dispatch(addVideoByYouTubeId(input))
  },
  onPlayButtonClick: () => {
    dispatch(playFirstVideo())
  },
  onStopButtonClick: () => {
    dispatch(stopVideo())
  },
  onNextButtonClick: () => {
    dispatch(playNextVideo())
  },
  onPreviousButtonClick: () => {
    dispatch(playPreviousVideo())
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(Header)