import React from 'react'
import style from './style.css'

const Carousel = () => (
  <div className={style.carousel}>
    <div>
      <video width='100%' height='100%' src='/static/img/video.mp4' autoPlay muted loop />
      <div>
        <h1>CONOCE INBATECA</h1>
        <div />
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam faucibus tristique metus. Nulla
          facilisi. Duis quis imperdiet mauris, a rutrum neque. Vestibulum pharetra, libero dictum dignissim
          semper, justo quam aliquet purus, eleifend vehicula massa nulla eu velit. Ut nec purus eu lectus
          bibendum auctor.
        </p>
      </div>
    </div>
  </div>
)

export default Carousel
