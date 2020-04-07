export const getYouTubeVideoId = (url) => {
  let videoId = ''
  const parseUrl = url.replace(/(>|<)/gi, '').split(/(vi\/|v=|\/v\/|youtu\.be\/|\/embed\/)/)

  if (parseUrl[2] !== undefined) {
    videoId = parseUrl[2].split(/[^0-9a-z_-]/i)
    videoId = videoId[0]
  } else {
    videoId = url
  }

  return videoId
}

export default getYouTubeVideoId