function timeFormat (seconds) {
  const hrs = ~~(seconds / 3600)
  const mins = ~~((seconds % 3600) / 60)
  const secs = seconds ? seconds % 60 : 0

  let ret = ''

  if (hrs > 0) ret += '' + hrs + ':' + (mins < 10 ? '' : '')
  ret += '' + mins + ':' + (secs < 10 ? '0' : '')
  ret += '' + secs
  return ret
}

export default timeFormat
