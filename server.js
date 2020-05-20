const serverFunction =  (port = false) => {
  const http = require('http')
  let PORT = port || process.env.PORT || 3000

  const server = http.createServer((req, res) => {
    if (req.url === '/') return respondHello(req, res)
    if (req.url.match(/^\/b64\//)) return respondBase64(req, res)
    if (req.url === '/user-agent') return respondUserAgent(req, res)

    res.end()
  })

  function respondHello (req, res) {
      res.end(JSON.stringify({ msg: 'hello' }))
  }

  function respondBase64 (req, res) {
    const phrase = req.url.replace(/^\/b64\//, '')
    res.end(JSON.stringify({ b64: Buffer.from(phrase).toString('base64') }))
  }

  function respondUserAgent (req, res) {
    const ua = req.headers['user-agent']
    res.end(JSON.stringify({ ua }))
  }

  console.log(`Server listening on port ${PORT}`)
  server.listen(PORT)
  return server
}
if (require.main == module) return serverFunction()

module.exports = serverFunction


