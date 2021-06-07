const express = require("express");
const morgan = require("morgan");
const mongoose = require("mongoose");
const Blog = require('./models/blog')

// express app
const app = express();

//connect to mongodb and listen for requests
const dbURI =
  "mongodb+srv://nodejs-ejs:test1234@nodetuts.4jj3i.mongodb.net/nodejs-ejs?retryWrites=true&w=majority";
mongoose
  .connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then((result) => {app.listen(3000, () => {
    console.log("Listening on http://localhost:3000");
  })})
  .catch((err) => console.log(err));


// register view engine
app.set("view engine", "ejs");

//middlewares & staticfiles(css,images etc)
app.use(express.static("public"));
app.use(express.urlencoded({extended:true}))
app.use(morgan("dev")); //3rd party middleware for logging in the console


//mongoose and mongo sandbox routes
app.get('/add-blog',(req,res)=>{
  const blog = new Blog({
    title: 'new blog 2',
    snippet: 'about my new blog',
    body: 'more about my new blog'
  })
  blog.save()
    .then((result)=>{
      res.send(result)
    })
    .catch((err)=>{
      console.log(err)
    })
})

app.get('/all-blogs',(req,res)=>{
  Blog.find()
  .then((result)=>{
    res.send(result);
  })
  .catch((err)=>{
    console.log(err);
  })
})

app.get('/single-blog',(req,res)=>{
  Blog.findById('60bb53359771062bb80f38ff')
  .then((result)=>{
    res.send(result);
  })
  .catch((err)=>{
    console.log(err);
  })
})

//routes
app.get("/", (req, res) => {
  res.redirect('/blogs')
});

app.get("/about", (req, res) => {
  res.render("about", { title: "About" });
});

//blog routes
app.get('/blogs',(req,res)=>{
  Blog.find().sort( {createdAt: -1 }) 
  .then((result)=>{
    res.render('index',{title: 'All Blogs', blogs: result})
  })
  .catch((err)=>{
    console.log(err)
  })
})

app.post('/blogs',(req,res)=>{
const blog = new Blog(req.body)
blog.save()
.then((result)=>{
  res.redirect('/blogs')
})
.catch((err=>{
  console.log(err)
}))
})

app.get("/blogs/create", (req, res) => {
  res.render("create", { title: "Create a new blog" });
});

// 404 page
app.use((req, res) => {
  res.status(404).render("404", { title: "404" });
});
