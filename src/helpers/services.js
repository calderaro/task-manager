import moment from 'moment'
import Promise from 'bluebird'
import api from './api'
import form from './form'

export const getReferences = () => api({durl: 'https://www.jasonbase.com/things/RPdd.json'})
