const express = require('express')
const bodyParser = require('body-parser')

const app = express()
app.listen()

console.log('Server running on %s', app.port);

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: false}))

require('./controllers/pacientesController')(app)
require('./controllers/profissionaisController')(app)

app.listen(process.env.PORT)

//console.log('Server is listening on port ' + app.address().port);