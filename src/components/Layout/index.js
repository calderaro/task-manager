import React from 'react'
import style from './style.css'
import Header from '../Header/'
import Footer from '../Footer/'

export default function Layout (props, children) {
  return (
    <div>
      <Header {...props} />
      {children}
      <Footer {...props} />
    </div>
  )
}
