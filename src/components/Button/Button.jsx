import React from 'react'
import PropTypes from 'prop-types'
import './Button.scss'

export const Button = ({ className, color, onClick, children }) => {
  let buttonClass = className + ' button'

  if (color) {
    buttonClass += ` button--${color}`
  }
  
  return (
    <button className={buttonClass} onClick={onClick}>
      {children}
    </button>
  )
}

Button.propTypes = {
  color: PropTypes.string,
  onClick: PropTypes.func
}

export default Button