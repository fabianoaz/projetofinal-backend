const mongoose = require('mongoose')

mongoose.connect('mongodb+srv://root:qwer1234@cluster0.nbshk.mongodb.net/dbteste',{ useUnifiedTopology: true , useNewUrlParser: true } )

mongoose.Promise = global.Promise

module.exports = mongoose