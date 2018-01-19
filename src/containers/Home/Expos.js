import React from 'react'
import style from './style.css'

const data = [
  {
    id: 1,
    title: 'Piotr Ilich Chaikovski - El lago de los cisnes',
    img: '/static/img/lagocisnes.jpg',
    multimediaName: 'inba_spr_lago_cisnes.mp4',
    extension: 'mp4',
    description: `cuento de hadas-ballet estructurado en cuatro actos, que fue encargado por el
      Teatro Bolshói en 1875 y se estrenó en 1877. La música fue compuesta por Piotr Ilich Chaikovski; se
      trata de su op. 20 y es el primero de sus ballets. En la producción original la coreografía fue creada
      por Julius Reisinger. El libreto se cree que fue escrito por Vladímir Petróvich Béguichev y Vasily Geltser,
      basándose en el cuento alemán Der geraubte Schleier (El velo robado) de Johann Karl August Musäus.`
  },
  {
    id: 2,
    title: 'Carlos Chávez - The visitors',
    img: '/static/img/carloschavez.jpg',
    multimediaName: 'the visitors acto.mp4',
    extension: 'mp4',
    description: `
    En este trabajo se alude a la única ópera de Carlos Chávez, The Visitors, partitura de enorme significación
    tanto en lo concerniente a sus aspectos formales cuanto en lo que se refiere a sus implicaciones culturales. Se
    exploran las circunstancias que suscitaron la composición, y se abunda en el proceso creativo seguido por Chávez. Más
    adelante, se hace un análisis de la sustancia dramática de la ópera, cuya construcción formal acusa
    clasicismo. Después se trata con detenimiento la correspondencia entre el libreto y el discurso musical, cuyas
    peculiaridades son enunciadas con cierto detalle.`
  },
  {id: 3, title: 'El Cascanueces', description: 'El cascanueces o simplemente Cascanueces (en ruso, Щелкунчик / Schelkúnchik Acerca de este sonido escuchar (?·i)) es un cuento de hadas-ballet estructurado en dos actos, que fue encargado por el director de los Teatros Imperiales Iván Vsévolozhsky en 1891 y se estrenó en 1892. La música fue compuesta por Piotr Ilich Chaikovski entre 1891 y 1892. Se trata de su op. 71 y es el tercero de sus ballets. En la producción original la coreografía fue creada por Marius Petipa y Lev Ivanov. El libreto fue escrito por Iván Vsévolozhsky y el propio Petipa, basándose en la adaptación de Alejandro Dumas (padre) del cuento El cascanueces y el rey de los ratones, de Ernst Theodor Amadeus Hoffmann.', img: '/static/img/expo1.jpg', video: '/static/img/video3.mp4'},
  {id: 4, title: 'El Fantasma de la opera', description: 'La novela está ambientada en el París de finales del siglo XIX, en la Ópera Garnier, un edificio lujoso y monumental construido sobre un lago subterráneo entre 1857 y 1874. Los empleados afirman que la ópera está encantada por un fantasma misterioso que provoca muchos accidentes. El fantasma de la ópera chantajea a los dos gerentes de la ópera para que le paguen 20 000 francos al mes y le reserven un palco privado para los conciertos, ya que él compone todas las óperas que se presentan ahí o hace arreglos musicales.', img: '/static/img/expo2.jpg', video: '/static/img/video3.mp4'},
]

const Expos = props => (
  <div className={style.worksContainer}>
    <div>
      <div className={style.expos}>
        <h2 className={style.sectionTitle}>Destacados <small>Ver todos <i className='fa fa-chevron-right' /></small></h2>
        <div>
          {data.map(e => (
            <div key={e.id} style={{backgroundImage: `url('${e.img}')`}}>
              <video src={e.video} autoPlay loop muted />
              <div>
                <h2>{e.title}</h2>
                <p>{e.description}</p>
                <a onClick={() => props.setModal({modal: 'visual', value: e})}>Ver Video</a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  </div>
)

export default Expos
