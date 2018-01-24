import React from 'react'
import {Link} from 'react-router-dom'
import style from './style.css'
import window from 'global/window'

const Navbar = (props) => {
  const navOut = props.navOut === undefined ? true : props.navOut
  return (
    <header className={navOut ? style.header + ' ' + style.headerOut : style.header}>
      <nav className={style.nav}>
        <div>
          <Link to='/'>TASK MANAGER</Link>
        </div>
        <div>
          <Link to='/'><i className='fa fa-home' /></Link>
          <Link to='/estadisticas'><i className='fa fa-bar-chart' /></Link>
          <a href='https://github.com/calderaro/task-manager' target='_blank'>
            <i className='fa fa-github' />
          </a>
          <a href='https://www.facebook.com/sharer/sharer.php?u=http%3A//104.236.31.209%3A3012/' target='_blank'>
            <i className='fa fa-share-alt' />
          </a>
          {props.auth.user.email
            ? <a onClick={() => window.firebase ? window.firebase.auth().signOut() : null} title='Salir' className={style.signOutBtn}>
              <i className='fa fa-sign-out' /> <span>{props.auth.user.email}</span>
            </a>
            : <a onClick={props.login} title='Entrar'>
              <i className='fa fa-sign-in' />
            </a>
          }
        </div>
      </nav>
    </header>
  )
}

export default Navbar
