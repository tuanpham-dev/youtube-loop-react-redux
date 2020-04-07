import React from 'react'
import VideoList from '../Video/VideoList'

const MainContent = ({ children }) => {
  return (
    <div className="main">
      <div className="container">
        <VideoList />
      </div>
    </div>
  )
}

export default MainContent
