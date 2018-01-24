import React from 'react'
import moment from 'moment'
import {BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend} from 'recharts'
import actions from '../../actions/'
import style from './style.css'
import Layout from '../../components/Layout/'

class Graph extends React.Component {
  state = {currentWeek: 0, lastWeek: 0}
  componentDidMount = () => {
    const currentWeek = moment().week()
    const lastWeek = currentWeek - 1
    this.setState({currentWeek, lastWeek})
  }
  render = () => {
    const daysArray = ['Domingo', 'Lunes', 'Martes', 'Miercoles', 'Jueves', 'Viernes', 'Sabado']
    const daysObject = daysArray.reduce((a, b) => ({...a, [b]: 0}), {})
    const totals = this.props.tasks.list.reduce((a, b) => {
      const date = moment(b.createdAt)
      if (b.status !== 'done') return a
      if (date.week() !== this.state.lastWeek) return a
      return ({totalCount: a.totalCount + 1, totalTime: a.totalTime + parseInt(b.time)})
    }, {totalCount: 0, totalTime: 0})
    const count = Object.entries(this.props.tasks.list.reduce((a, b) => {
      const date = moment(b.createdAt)
      if (b.status !== 'done') return a
      if (date.week() !== this.state.lastWeek) return a
      const key = daysArray[date.day()]
      return ({...a, [key]: a[key] + 1})
    }, daysObject))
    .map(o => ({name: o[0], value: o[1]}))
    const time = Object.entries(this.props.tasks.list.reduce((a, b) => {
      const date = moment(b.createdAt)
      if (b.status !== 'done') return a
      if (date.week() !== this.state.lastWeek) return a
      const key = daysArray[date.day()]
      return ({...a, [key]: a[key] + (b.time / 1000 / 60)})
    }, daysObject))
    .map(o => ({name: o[0], value: parseInt(o[1])}))
    return Layout(this.props,
      <div className={style.graphContainer}>
        <div className={style.countGraph}>
          <h2>Estadísticas de la ultima semana</h2>
          <h4>Total tareas completadas: {totals.totalCount}</h4>
          <div>
            <BarChart width={1000} height={600} data={count}
              margin={{top: 5, right: 30, left: 20, bottom: 5}}>
              <XAxis dataKey='name' />
              <YAxis datakey='value' />
              <CartesianGrid strokeDasharray='3 3' />
              <Tooltip />
              <Legend />
              <Bar dataKey='value' name='Tareas Completadas' fill='#f3757c' />
            </BarChart>
          </div>
          <h4>Total tiempo: {parseInt(totals.totalTime / 60 / 1000)} minutos</h4>
          <div>
            <BarChart width={1000} height={600} data={time}
              margin={{top: 5, right: 30, left: 20, bottom: 5}}>
              <XAxis dataKey='name' />
              <YAxis datakey='time' />
              <CartesianGrid strokeDasharray='3 3' />
              <Tooltip />
              <Legend />
              <Bar dataKey='value' name='Tiempo usado en minutos' fill='#f3757c' />
            </BarChart>
          </div>
        </div>
      </div>
    )
  }
}

export default actions(Graph)
