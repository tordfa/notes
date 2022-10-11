require('dotenv').config()
const express = require('express');
const cors = require('cors')
const cookieParser = require('cookie-parser')

const app = express();

const {signup, signin, signinguest, logout} = require('./controller/authController')
const {getNotes, addNote, editNote, removeNote} = require('./controller/notesController')
const checkDuplicateUser = require('./middleware/checkDuplicateUser')
const verifyToken = require('./middleware/verifyToken')

const mongoose = require('mongoose');

const port = process.env.PORT;
const uri = process.env.DB_URI;

mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true})
  .then(()=>{
    console.log("DB Connected")

  })
  .catch(err => {
    console.error("Connection error", err);
    process.exit();
  })

app.use(cors(({credentials: true})))
app.use(cookieParser());
app.use(express.json())

app.use(express.static("../build"))

app.listen(port, () => {
  console.log("Server running at port: " + port)
})

app.get('/',(req,res) => {
  console.log("GET REQUEST")
})

app.post('/api/signup',[checkDuplicateUser],(req,res) => {
  console.log("Signing up new user: ")
  console.log("New User. Username: " + req.query.user)
  console.log("Password: " + req.query.password)
  signup(req,res);
})

// ADD MIDDlEWARE CHECKING FOR ATTACKS?
app.post('/api/signin',(req,res) => {
  signin(req,res);
})

app.post('/api/signinguest',(req,res) => {
  console.log("Loggin in as guest")
  signinguest(req,res)
})

app.post('/api/logout',[verifyToken],(req,res) => {
  logout(req,res)
})

app.post('/api/checklogin',[verifyToken],(req,res) => {
  res.status(200).send({ message: "Authorized!" , isLoggedIn: true})
})

app.get('/api/getnotes',[verifyToken],(req,res) => {
  console.log("Getting notes")
  getNotes(req,res);

})

app.post('/api/addnote',[verifyToken],(req,res) => {
  console.log("Adding note")
  addNote(req,res);
})

app.post('/api/editnote',[verifyToken],(req,res) => {
  console.log("Editing note")
  editNote(req,res);
})

app.post('/api/removenote',[verifyToken],(req,res) => {
  console.log("Removing note")
  removeNote(req,res);
})

