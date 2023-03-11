const express = require('express')
const app = express()
const ejs = require('ejs')
const mongoose = require('mongoose')
const { connect } = require('http2')

// connect to mongodb
mongoose
  .connect('mongodb://127.0.0.1:27017/study', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log('Connected to MongoDB')
  })
  .catch((err) => {
    console.log('failed')
    console.log(err)
  })

// create a schema
const studentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'you forget to set your name'],
  },
  age: {
    type: Number,
    required: true,
  },
  major: {
    type: String,
    enum: ['CS', 'Chinese', 'Math'],
    required: true,
  },
  scholorship: {
    merit: {
      type: Number,
      min: 0,
      max: 5000,
      default: 0,
    },
    other: {
      type: Number,
      min: 0,
      max: 5000,
      default: 0,
    },
  },
})

// create a instance method belongs to Schema
studentSchema.methods.totalScholorship = function () {
  return this.scholorship.merit + this.scholorship.other
}
// create a static method belongs to model

//

// create a model
const Student = mongoose.model('Student', studentSchema)

// // find Jon in db
// Student.find({}).then((data) => {
//   console.log(data)
// })

//update
//Student.Update(
//     { name: 'Jon' },
//     { name: 'Jon Benson' },
//   ).then((msg) => {
//     console.log(msg)
//   })
// Student.findOneAndUpdate(
//   { name: 'Jon' },
//   { name: 'Jon Benson' },
//   { new: true },
//   {runvalidata: true},
// ).then((msg) => {
//   console.log(msg)
// })

// // creat an object
// const Mike = new Student({
//   name: 'Mike',
//   age: 21,
//   major: 'Chinese',
//   scholorship: { merit: 3000, other: 1000 },
// })

// //save Jon
// Mike.save()
//   .then(() => {
//     console.log('succeed')
//   })
//   .catch((e) => {
//     console.log('failed')
//     console.log(e)
//   })

// Student.findOne({ name: 'Jon Benson' })
//   .then((data) => {
//     console.log(data)
//     let result = data.totalScholorship()
//     console.log(result)
//   })
//   .catch((e) => {
//     console.log(e)
//   })

app.use(express.static('public'))

app.get('/', (req, res) => {
  res.render('index.ejs')
})

app.listen(3000, () => {
  console.log('server is running at 3000')
})
