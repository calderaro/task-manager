import React from 'react'
import style from './style.css'

export default function Timer (props) {
  return (
    <div className={style.timer}>
      <div className={style.time}>
        {props.time}
      </div>
      <div className={style.buttons}>
        {props.interval
          ? <button
            title='Pausar contador de tiempo'
            onClick={props.pause}>
              <i className='fa fa-pause' />
              <span> Pausar</span>
          </button>
          : <button
            title='Iniciar contador de tiempo'
            onClick={props.start}>
                <i className='fa fa-play' />
                <span> Iniciar</span>
            </button>
        }
        <button
          title='Detener contador de tiempo'
          onClick={props.stop}>
            <i className='fa fa-stop' />
            <span> Detener</span>
        </button>
        <button
          title='Reiniciar contador de tiempo'
          onClick={props.reset}>
            <i className='fa fa-repeat' />
            <span> Reiniciar</span>
        </button>
      </div>
    </div>
  )
}
