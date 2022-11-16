module.exports = numberMask = v => {
  if (!v) v = 0
  v = v.toString()
  return v.replace(/[^\d]/g, '') // permite apenas numeros
}
