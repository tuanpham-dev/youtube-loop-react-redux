import * as actionTypes from '../actions/actionTypes'
// import isYouTubeVideoExists from '../utils/isYouTubeVideoExists'
import getYouTubeVideoId from '../utils/getYouTubeVideoId'

export const addVideoByYouTubeId = (youtubeId) => {
  const videoId = getYouTubeVideoId(youtubeId)

  return {
    type: actionTypes.ADD_VIDEO_BY_YOUTUBE_ID,
    payload: {
      youtubeId: videoId
    }
  }

  // return dispatch => {
  //   const videoId = getYouTubeVideoId(youtubeId)

  //   isYouTubeVideoExists(videoId).then(isExists => {
  //     if (isExists) {
  //       dispatch({
  //         type: actionTypes.ADD_VIDEO_BY_YOUTUBE_ID,
  //         payload: {
  //           youtubeId: videoId
  //         }
  //       })
  //     }
  //   })
  // }
}

export const addVideo = (video) => {
  return {
    type: actionTypes.ADD_VIDEO,
    payload: {
      video
    }
  }
}

export const removeVideo = (videoId) => {
  return {
    type: actionTypes.REMOVE_VIDEO,
    payload: {
      videoId
    }
  }
}

export const editVideo = (video) => {
  return {
    type: actionTypes.EDIT_VIDEO,
    payload: {
      video
    }
  }
}

export const updateVideos = (videos) => {
  return {
    type: actionTypes.UPDATE_VIDEOS,
    payload: {
      videos
    }
  }
}

export const playVideo = (videoId) => {
  return {
    type: actionTypes.PLAY_VIDEO,
    payload: {
      videoId
    }
  }
}

export const playFirstVideo = () => {
  return {
    type: actionTypes.PLAY_FIRST_VIDEO
  }
}

export const stopVideo = () => {
  return {
    type: actionTypes.PLAY_VIDEO,
    payload: {
      videoId: null
    }
  }
}

export const playNextVideo = () => ({
  type: actionTypes.PLAY_NEXT_VIDEO
})

export const playPreviousVideo = () => ({
  type: actionTypes.PLAY_PREVIOUS_VIDEO
})

