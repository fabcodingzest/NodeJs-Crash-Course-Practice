const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const blogRoutes = require('./routes/blogRoutes');
require('dotenv/config');
//express app
const app = express();

const dbURI = `mongodb+srv://${process.env.DB_NAME}:${process.env.DB_PASSWORD}@cluster0.8q6uk.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`;

mongoose.connect(dbURI, {useNewUrlParser: true, useUnifiedTopology: true})
  .then((result) => app.listen(3000))
  .catch((err) => console.log(err))
// register view engine
app.set('view engine', 'ejs')

// listen for requests

// middleware & static files
app.use(express.static('public'))
app.use(express.urlencoded({extended: true}))
app.use(morgan('dev'));



//mongoose and mongo sandbox routes
// app.get('/add-blog', (req, res) => {
//   const blog = new Blog({
//     title: 'Fab blog number 2',
//     snippet: 'about the fucking blog',
//     body: 'moreeeeeeeeeeeeeeeeee about blog'
//   });

//   blog.save()
//     .then((result) => {
//     res.send(result)
//     })
//     .catch((err) => {
//     console.log(err);
//   })
// })

// app.get('/all-blogs', (req, res) => {
//   Blog.find()
//       .then(result => {
//     res.send(result)
//     })
//     .catch((err) => {console.log(err);})
// })

// app.get('/single-blog', (req, res) => {
//   Blog.findById('5f09ac76c4b5a06354a57f53')
//     .then(result => {
//     res.send(result)
//     })
//     .catch((err) => {console.log(err);})
// })

app.get('/', (req, res) => {
  //res.send('<p> home page </p>')
  res.redirect('/blogs')
})
app.get('/about', (req, res) => {
  //res.send('<p> about page </p>')
  res.render('about' , {title: 'About'})
})

// blog routes
app.use('/blogs', blogRoutes);

// redirect
// app.get('/about-us', (req, res) => {
//   res.redirect('/about')
// })

// 404 page (needs to be at bottom of routes)
app.use((req, res) => {
  res.status(404).render('404', {title: 'Page Not Found'})
})