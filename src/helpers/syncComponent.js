import React from 'react'

function syncComponent (chunkName, mod) {
  const Component = mod.default ? mod.default : mod // es6 module compat
  function SyncComponent (props) {
    if (props.ssr) return Component
    if (props.staticContext && props.staticContext.splitPoints) {
      props.staticContext.splitPoints.push(chunkName)
    }

    return (<Component {...props} />)
  }

  return SyncComponent
}

export default syncComponent
