const express = require("express");
const app = express();
const port = 3000;

//listen to requests
app.listen(port, () => {
  console.log(`Example app listening on port 3000!`);
});

app.get("/", (req, res) => {
  res.sendFile("./views/index.html", { root: __dirname });
});

app.get("/about", (req, res) => {
  res.sendFile("./views/about.html", { root: __dirname });
});

//redirects
app.get("/about-me", (req, res) => {
  res.redirect("/about");
});

//defaults-at the bottom only
app.use((req,res)=>{
    res.status(404).sendFile("./views/404.html", { root: __dirname });
})
