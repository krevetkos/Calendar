const config = require('config')
const app = require('./app')

const port = config.get('port')
const server = app.listen(port, () => {
  console.log('Server is up and running on port number ' + port)
})

module.exports = server
