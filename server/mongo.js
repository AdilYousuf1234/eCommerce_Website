const mongoose = require('mongoose')

const url = "mongodb+srv://test645:abcdef123456@cluster0.nojfj.mongodb.net/groceryStore?retryWrites=true&w=majority"

mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true })

const users = new mongoose.Schema({
  name: String,
  email: String,
  password: String 
})

const Note = mongoose.model('User', users)

const note = new Note({
  name: 'Vinay',
  email: "Vinay@example.com",
  password: "123456"
})

// Note.find({}).then(result => {
//     result.forEach(note => {
//       console.log(note)
//     })
//     mongoose.connection.close()
//   })

note.save().then(result => {
  console.log('note saved!')
  mongoose.connection.close()
})
