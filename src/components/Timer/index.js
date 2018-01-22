import React from 'react'
import style from './style.css'

export default function Timer (props) {
  return (
    <div className={style.timer}>
      <div className={style.time}>
        {props.time}
      </div>
      {props.interval
        ? <div className={style.buttons}>
          <button
            title='Pausar contador de tiempo'
            onClick={props.pause}>
              Pausar
          </button>
          <button
            title='Detener contador de tiempo'
            onClick={props.stop}>
              Detener
          </button>
          <button
            title='Reiniciar contador de tiempo'
            onClick={props.reset}>
              Reiniciar
          </button>
        </div>
        : <div className={style.buttons}>
          <button
            title='Iniciar contador de tiempo'
            onClick={props.start}>
              INICIAR
          </button>
        </div>
      }
    </div>
  )
}
