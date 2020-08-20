import React, { SelectHTMLAttributes } from 'react'
import PropTypes from 'prop-types'

import './styles.css'

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  name: string
  label: string
  options?: Array<OptionProps>
}

interface OptionProps {
  value: string
  label: string
}

const Select: React.FC<SelectProps> = (props) => {
  const {
    name, label, options, ...rest
  } = props

  return (
    <div className="select-block">
      <label htmlFor={name}>{label}</label>
      <select value="" id={name} {...rest}>
        <option value="" disabled hidden>Selecione uma opção</option>
        {options?.map((option: OptionProps) => {
          const { value, label } = option
          return <option key={value} value={value}>{label}</option>
        })}
      </select>
    </div>
  )
}

Select.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  options: PropTypes.array
}

export default Select
