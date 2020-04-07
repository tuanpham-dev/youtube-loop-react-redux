import * as actionTypes from '../actions/actionTypes'

const initialState = {
  videos: [],
  playingVideo: {
    id: null
  }
}

export default (state = initialState, { type, payload }) => {
  let index = null

  switch (type) {
    case actionTypes.ADD_VIDEO_BY_YOUTUBE_ID:
      const maxId = Math.max(...state.videos.map(video => video.id), 0)
      const video = {
        id: maxId + 1,
        youtubeId: payload.youtubeId,
        volume: null,
        range: [null, null]
      }

      return {
        ...state,
        videos: [...state.videos, video]
      }

    case actionTypes.ADD_VIDEO:
      return {
        ...state,
        videos: [...state.videos, payload.video]
      }

    case actionTypes.PLAY_VIDEO:
      if (state.playingVideo.videoId !== payload.videoId) {
        return {
          ...state,
          playingVideo: {
            id: payload.videoId
          }
        }
      } else {
        return state
      }

    case actionTypes.PLAY_FIRST_VIDEO:
      if (state.videos.length > 0) {
        return {
          ...state,
          playingVideo: {
            id: state.videos[0].id
          }
        }
      } else {
        return state;
      }

    case actionTypes.PLAY_NEXT_VIDEO:
      let nextVideoIndex
      index = state.videos.findIndex(video => video.id === state.playingVideo.id)

      if (index === state.videos.length - 1) {
        nextVideoIndex = 0
      } else {
        nextVideoIndex = index + 1
      }
      
      return {
        ...state,
        playingVideo: {
          id: state.videos[nextVideoIndex].id
        }
      }

    case actionTypes.PLAY_PREVIOUS_VIDEO:
      let previousVideoIndex
      index = state.videos.findIndex(video => video.id === state.playingVideo.id)

      if (index === 0) {
        previousVideoIndex = state.videos.length - 1
      } else {
        previousVideoIndex = index - 1
      }
      
      return {
        ...state,
        playingVideo: {
          id: state.videos[previousVideoIndex].id
        }
      }
    
    case actionTypes.UPDATE_VIDEOS:
      return {
        ...state,
        videos: [...payload.videos]
      }

    case actionTypes.REMOVE_VIDEO:
      index = state.videos.findIndex(video => video.id === payload.videoId)
      let playingVideo = null

      if (index !== null) {
        if (state.playingVideo.id === payload.videoId) {
          if (state.videos.length <= 1) {
            playingVideo = {
              id: null
            }
          } else {
            playingVideo = {
              id: state.videos[index === state.videos.length - 1 ? 0 : index + 1].id
            }
          }
        }

        const videos = [...state.videos]
        videos.splice(index, 1)

        if (playingVideo !== null) {
          return {
            ...state,
            videos,
            playingVideo
          }
        } else {
          return {
            ...state,
            videos
          }
        }
      } else {
        return state
      }

    case actionTypes.EDIT_VIDEO:
      index = state.videos.findIndex(video => video.id === payload.video.id)

      if (index !== null) {
        const videos = [...state.videos]
        videos.splice(index, 1, payload.video)

        return {
          ...state,
          videos
        }
      } else {
        return state
      }

    default:
      return state
  }
}
