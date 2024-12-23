const express = require("express");
const ejs = require("ejs");
const path = require("path");
const dotenv = require("dotenv");
const connctDB = require("./config/database")
const Contact = require("./model/contactModel")


dotenv.config() 



const app = express();

connctDB()

app.use(express.urlencoded({ extended: true }));
app.use(express.json())
app.use(express.static(path.join(__dirname,"public")))
app.set("view engine", "ejs")
app.set("views", path.join(__dirname, "views"))

// let contacts=[
//   { name: "Shubham", phone: "1234567890" },
//   { name: "Aman", phone: "1234567890" },
//   { name: "Rohit", phone: "1234567890" },
//   { name: "Rahul", phone: "1234567890" },
//   { name: "Raj", phone: "1234567890" },
  
// ]

app.get("/", (req, res) => {
    res.render("home.ejs",{title:"Home Page"})
})

app.get("/practice", (req, res) => {
  res.render("practice.ejs", {
    title: "Practice Page",
    name:"Shubham",
  })
})

app.get("/contact",async (req, res) => {
  const contacts = await Contact.find()
  console.log(contacts);
  res.render("contact.ejs", {
    title: "Contact Page",
    contacts
  })
})


app.post("/create/contact", (req, res) => {
  console.log(req.body.phon);
  
  // contacts.push({
  //   name:req.body["nam"],
  //   phone:req.body["phon"]
  // })

  const contact = Contact.create({
    name: req.body["nam"],
    phone: req.body["phon"]
  })

  res.redirect("/contact")
})


app.post("/delete/:id",async (req, res) => {
  // const { name } = req.params
  
  // const filteredContacts = contacts.filter(contact => contact.name != name)

  // contacts = filteredContacts
 
  // const index = contacts.findIndex((x)=>x.name===name)
  // console.log(index);

  // contacts.splice(index,1)



  // delete from database
  const id = req.params.id
  // console.log(id);
  const deletedContact =await Contact.findByIdAndDelete(id)
  

  res.redirect("/contact")
})




const port=3000
app.listen(port, () =>
  console.log("Server is running on port 3000")
);