import React, { TextareaHTMLAttributes } from 'react'
import PropTypes from 'prop-types'

import './styles.css'

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  name: string
  label: string
}

const Textarea: React.FC<TextareaProps> = (props) => {
  const { name, label, ...rest } = props

  return (
    <div className="textarea-block">
      <label htmlFor={name}>{label}</label>
      <textarea id={name} {...rest} />
    </div>
  )
}

Textarea.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired
}

export default Textarea
