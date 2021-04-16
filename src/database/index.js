const mongoose = require('mongoose')

//mongoose.connect('mongodb+srv://root:qwer1234@cluster0.nbshk.mongodb.net/dbteste',{useMongoClient: true})

mongoose.connect(DATABASE_URL,{useMongoClient: true})

mongoose.Promise = global.Promise

module.exports = mongoose