import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

import logoImg from '../../assets/images/logo.svg'

import backIcon from '../../assets/images/icons/back.svg'

import './styles.css'

interface PageHeaderProps {
  children?: any
  title: string
  description?: string
}

const PageHeader: React.FC<PageHeaderProps> = (props) => {
  const { children, title, description } = props
  return (
    <header className="page-header">
      <div className="top-bar-container">
        <Link to="/">
          <img src={backIcon} alt="Voltar" />
        </Link>
        <img src={logoImg} alt="Proffy"/>
      </div>

      <div className="header-content">
        <strong>{title}</strong>
        {description && <p>{description}</p>}

        {children}
      </div>
    </header>
  )
}

PageHeader.propTypes = {
  children: PropTypes.node,
  title: PropTypes.string.isRequired,
  description: PropTypes.string
}

export default PageHeader
