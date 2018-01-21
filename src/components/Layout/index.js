import React from 'react'
import style from './style.css'
import Header from '../Header/'

export default function Layout (props, children) {
  return (
    <div>
      <Header {...props} />
      {children}
    </div>
  )
}
