const tape = require('tape')
const jsonist = require('jsonist')

const PORT = process.env.PORT || require('get-port-sync')()
const server = require('./server')(PORT)
const urlBase = `http://localhost:${PORT}`

tape('should respond hello', (t) => {
  jsonist.get(urlBase, (err, body) => {
    try {
      if (err) throw err.message

      if(!body.msg) throw 'empty body'

      t.equal(body.msg, 'hello')
    } catch (e) {
      console.log('error from should respond hello ', e)
    }
    t.end()
  })
})

tape('should respond b64', (t) => {
  jsonist.get(`${urlBase}/b64/hello`, (err, body) => {
    try {
      if (err) throw err.message

      if(!body.b64) throw 'empty body'

      t.equal(body.b64, 'aGVsbG8=')
    } catch (e) {
      console.log('error from should respond b64 ', e)
    }
    t.end()
  })
})

tape('should respond user-agent', (t) => {
  const opts = { headers: { 'User-Agent': 'tape' } }
  jsonist.get(`${urlBase}/user-agent`, opts, (err, body) => {
    try {
      if (err) throw err.message

      if(!body.ua) throw 'empty body'

      t.equal(body.ua, 'tape')
    } catch (e) {
      console.log('error from should respond user-agent ', e)
    }
    t.end()
  })
})

tape('cleanup', function (t) {
  server.close()
  t.end()
})
