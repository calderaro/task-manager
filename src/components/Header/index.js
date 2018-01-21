import React from 'react'
import {Link} from 'react-router-dom'
import style from './style.css'

const Navbar = (props) => {
  const navOut = props.navOut === undefined ? true : props.navOut
  return (
    <header className={navOut ? style.header + ' ' + style.headerOut : style.header}>
      <nav className={style.nav}>
        <div>
          <a>TASK MANAGER</a>
        </div>
        <div>
          <Link to='/login'>Registro / Login</Link>
        </div>
      </nav>
    </header>
  )
}

export default Navbar
