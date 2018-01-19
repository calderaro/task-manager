import React from 'react'
import {Link} from 'react-router-dom'
import style from './style.css'

const Navbar = (props) => {
  const navOut = props.navOut === undefined ? true : props.navOut
  return (
    <header className={navOut ? style.header + ' ' + style.headerOut : style.header}>
      <nav className={style.nav}>
        <div>
          <Link to='/'>
            <img src='/static/img/inbateca.svg' />
          </Link>
          <Link to='/conocenos'>CONÓCENOS</Link>
          <Link to='/exposiciones'>EXPOSICIONES</Link>
          <Link to='/obras'>OBRAS</Link>
          <Link to='/audios'>AUDIOS</Link>
          <Link to='/videos'>VIDEOS</Link>
        </div>
        <div>
          <button><i className='fa fa-search' /></button>
          <Link to='/login'>Registro / Login</Link>
        </div>
      </nav>
    </header>
  )
}

export default Navbar
