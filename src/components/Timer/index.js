import React from 'react'
import style from './style.css'

export default function Timer (props) {
  return (
    <div className={style.timer}>
      <div className={style.time}>
        25:00
      </div>
      <div className={style.buttons}>
        <button
          title='Iniciar contador de tiempo'>
            INICIAR
        </button>
      </div>
    </div>
  )
}
