import React from 'react'
import style from './style.css'

export default function Footer (props) {
  return (
    <div className={style.footer}>
      <div>
        <div>
          <h3>MEDIATECA</h3>
          <a href='#' >INBA</a>
          <a href='#' >MUSITECA</a>
          <a href='#' >Conservatorio de Música</a>
          <a href='#' >Afiliados al INBA</a>
          <a href='#' >Bellas Artes</a>
        </div>
        <div>
          <h3>CONTACTO</h3>
          <a href='#' >Mesa de ayuda, dudas e información</a>
          <a href='#' >contacto@inbatk.gob.mx</a>
          <a href='#' >Denuncia contra servidores públivos</a>
        </div>
        <div>
          <h3>ENLACES</h3>
          <a href='#' >Reformas</a>
          <a href='#' >Portal de obligaciones de transparencia</a>
          <a href='#' >Sistema infomex</a>
          <a href='#' >INAI</a>
        </div>
        <div>
          <h3>Suscríbete</h3>
          <input />
        </div>
      </div>
      <div>Imbatek | 2017 - Todos los derechos reservados.</div>
    </div>
  )
}
