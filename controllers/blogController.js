const Blog = require('../models/blog');

const blog_index = (req, res) => {
  Blog.find().sort({createdAt: -1})
    .then(result => {
      res.render('blogs/index' , {title: 'All Blogs', blogs: result})
    })
    .catch((err) =>{console.log(err)})
}

const blog_details = (req, res) => { 
  const id = req.params.id;
  Blog.findById(id)
    .then(result => {
      res.render('blogs/details', {blog: result, title: 'Blog Details'})
    })
    .catch(err => {
      res.status(404).render('404', {title: 'Page Not Found'})
  })
}

const blog_create_get = (req, res) => {
  res.render('blogs/create', {title: 'Create'})
} 

const blog_edit_get = (req, res) => {
  const id = req.params.id
  Blog.findById(id).then((blog) => {
    res.render('blogs/editBlog', {title: 'Edit', blog})
  }).catch(err => console.log(err))
} 

const blog_edit_post = async (req, res) => {
  const id = req.params.id
  Blog.findByIdAndUpdate(
    { _id: id },
    req.body,
    err => {
      if (err) return res.send(500, err);
      res.redirect("/blogs");
      }
  ).then(result =>
    redirect('/blogs')
  ).catch(err => console.log(err))
}

const blog_create_post = (req, res) => {
  const blog = new Blog(req.body)
  blog.save()
    .then(result => {
    res.redirect('/blogs')
    })
    .catch(err => {
    console.log(err)
  })
} 

const blog_delete = (req, res) => {
  const id = req.params.id;
  Blog.findByIdAndDelete(id)
    .then(result => {
      res.json({redirect: '/blogs'})
    })
    .catch(err => console.log(err))
}


module.exports = {
  blog_index,
  blog_details,
  blog_create_get,
  blog_create_post,
  blog_edit_get,
  blog_edit_post,
  blog_delete
}