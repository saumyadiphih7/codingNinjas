const express = require("express");
const ejs = require("ejs");
const path=require("path");
const { title } = require("process");

const app = express();


app.set("view engine", "ejs")
app.set("views", path.join(__dirname, "views"))

app.get("/", (req, res) => {
    res.render("home.ejs",{title:"Home Page"})
})

app.get("/practice", (req, res) => {
  res.render("practice.ejs", {
    title: "Practice Page",
    name:"Shubham",
  })
})

const port=3000
app.listen(port, () =>
  console.log("Server is running on port 3000")
);