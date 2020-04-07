import axios from 'axios'

export const isYouTubeVideoExists = async (videoId) => {
  try {
    const res = await axios.get(`http://www.youtube.com/oembed?url=http://www.youtube.com/watch?v=${videoId}&format=json`, {
      crossdomain: true
    })
    
    return res.data.title !== ''
  } catch (error) {
    return false
  }
}

export default isYouTubeVideoExists