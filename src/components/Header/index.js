import React from 'react'
import {Link} from 'react-router-dom'
import style from './style.css'

const Navbar = (props) => {
  const navOut = props.navOut === undefined ? true : props.navOut
  return (
    <header className={navOut ? style.header + ' ' + style.headerOut : style.header}>
      <nav className={style.nav}>
        <div>
          <Link to='/'>TASK MANAGER</Link>
        </div>
        <div>
          <Link to='/'>Home</Link>
          <Link to='/estadisticas'>Estadísticas</Link>
          <Link to='/login'>Registro / Login</Link>
        </div>
      </nav>
    </header>
  )
}

export default Navbar
