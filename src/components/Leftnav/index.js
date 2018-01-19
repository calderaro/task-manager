import React from 'react'
import {Link} from 'react-router-dom'
import style from './style.css'
import data from '../MenuList/data'

const isopen = (props) => props.general.modal === 'leftnav' ? (' ' + style.open) : ''
const Leftnav = (props) => {
  const match = props.location.pathname.match(/jovenes|adultos|mayores/)[0]
  const type = ['jovenes', 'adultos', 'mayores'].indexOf(match)
  return (
    <div className={style.leftnav + isopen(props)}>
      <div className={style.nav}>
        <div>
          <Link to='/'>
            <img src={`/static/img/menu/home${type}.svg`} />
            Inicio
          </Link>
        </div>
        <div>
          <Link to={`/${match}`}>
            <img src={`/static/img/menu/menu${type}.svg`} />
            Menú
          </Link>
        </div>
        {data(match).map((a, i) => (
          <div key={i}>
            {a.href
              ? <a href={a.href} target='_blank'>
                <img src={`/static/img/menu/${a.img}${type}.svg`} />
                {a.name}
              </a>
              : <Link to={a.link}>
                <img src={`/static/img/menu/${a.img}${type}.svg`} />
                {a.name}
              </Link>
            }
          </div>
        ))}
      </div>
    </div>
  )
}

export default Leftnav
