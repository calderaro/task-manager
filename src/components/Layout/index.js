import React from 'react'
import style from './style.css'
import Header from '../Header/'
import Footer from '../Footer/'
import Reproductor from '../Reproductor/'
import VisualModal from '../VisualModal/'

export default function Layout (props, children) {
  return (
    <div>
      {props.general.value && props.general.value.multimediaName ? <VisualModal {...props} /> : null}
      <Header {...props} />
      <Reproductor {...props} />
      {children}
      <Footer {...props} />
    </div>
  )
}
