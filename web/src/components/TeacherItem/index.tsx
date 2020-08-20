import React from 'react'
import PropTypes from 'prop-types'

import whatsappIcon from '../../assets/images/icons/whatsapp.svg'

import api from '../../services/api'

import convertNumberToBRL from '../../utils/convertNumberToBRL'

import './styles.css'

export interface Teacher {
  avatar: string
  bio: string
  cost: number
  id: number
  name: string
  subject: string
  user_id: number
  whatsapp: string
}

interface TeacherItemProps {
  teacher: Teacher
}

const TeacherItem: React.FC<TeacherItemProps> = (props) => {
  const { teacher } = props
  const {
    avatar, bio, cost, id, name, subject, user_id, whatsapp
  } = teacher

  function createNewConnection () {
    api.post('connections', {
      user_id: user_id
    })
  }

  return (
    <article className="teacher-item">
      <header>
        <img src={avatar} alt={name} />
        <div>
          <strong>{name}</strong>
          <span>{subject}</span>
        </div>
      </header>

      <p>{bio}</p>

      <footer>
        <p>
          Preço/hora
          <strong>{convertNumberToBRL(cost)}</strong>
        </p>
        <a
          target="_blank"
          rel="noopener noreferrer"
          onClick={createNewConnection}
          href={`https://wa.me/${whatsapp}`}
        >
          <img src={whatsappIcon} alt="Whatsapp" />
            Entrar em contato
        </a>
      </footer>
    </article>
  )
}

TeacherItem.propTypes = {
  teacher: PropTypes.any.isRequired
}

export default TeacherItem
