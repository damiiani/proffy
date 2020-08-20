import React, { InputHTMLAttributes } from 'react'
import PropTypes from 'prop-types'

import './styles.css'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  name: string
  label: string
}

const Input: React.FC<InputProps> = (props) => {
  const { name, label, ...rest } = props

  return (
    <div className="input-block">
      <label htmlFor={name}>{label}</label>
      <input type="text" id={name} {...rest} />
    </div>
  )
}

Input.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired
}

export default Input
