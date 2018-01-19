import {renderToString} from 'react-dom/server'
import serialize from 'serialize-javascript'

const prefix = `/static/${process.env.target || 'development'}/`
const main = prefix + 'main.js'

const productionHeaderDependencies = `
  <link rel='stylesheet' href='${prefix}style.css' />
`
const productionDependencies = `
  <script type='application/javascript' src='${prefix}manifest.js'></script>
  <script type='application/javascript' src='${prefix}vendor.js'></script>
`

export default (props) => {
  const {head = {keywords: []}, root, initialState, routerContext} = props || {}
  const metas = `
    <title>${head.title || ''}</title>
    <meta name='description' content='${head.description || ''}' />
    <meta property='og:title' content='${head.ogtitle || ''}' />
    <meta property='og:description' content='${head.ogdescription || ''}' />
    <meta property='og:url' content='${head.ogurl || ''}' />
    <meta property='og:type' content='${head.ogtype || 'website'}' />
    <meta property='og:image' content='${head.ogimage || '/static/img/opgimg.png'}' />
    <meta name='keywords' content='${head.keywords}'>
  `

  return `
    <html>
      <head>
        <link rel='shortcut icon' type='image/png' href='/static/favicon.ico'/>
        <meta charSet='utf-8'/>
        <meta httpEquiv='x-ua-compatible' content='ie=edge'/>
        <meta name='viewport' content='width=device-width, initial-scale=1'/>
        ${metas}
        ${process.env.NODE_ENV === 'production' ? productionHeaderDependencies : ''}
        <link href="https://fonts.googleapis.com/css?family=Archivo+Black|Source+Sans+Pro:400,700" rel="stylesheet">
        <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css">
      </head>
      <body>
        <div id='root'>${root ? renderToString(root) : ''}</div>
        <script type='text/javascript'>
          window.initialState = ${serialize(initialState)}
          window.splitPoints = ${routerContext ? JSON.stringify(routerContext.splitPoints) : null}
        </script>
        <script src="https://www.gstatic.com/firebasejs/4.6.2/firebase.js"></script>
        ${process.env.NODE_ENV === 'production' ? productionDependencies : ''}
        <script type='application/javascript' src='${main}'></script>
      </body>
    </html>
  `
}
