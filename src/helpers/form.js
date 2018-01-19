
export default function formData (input) {
  const data = new FormData()
  Object.keys(input).forEach(k => data.append(k, input[k]))
  return data
}
