const User = require('../models/user.model')
const Note = require('../models/note.model')

const getNotes = (req, res) => {
    User.findOne({
        _id: req.userId
    }).exec((err, user) => {
        if(err) {
            console.log("Error finding user.")
            res.status(500).send({message: err});
            return;
        }
        if (!user) {
            console.log("Could not find user");
            res.cookie("xtoken","",{httpOnly: true})
            res.status(400).send({ message: "Could not find user" });
            return;
        }
        res.send(user.notes)
        
    })
}
// For View 
const addNote = (req, res) => {
    User.findOne({
        _id: req.userId
    }).exec((err, user) => {
        if(err) {
            console.log("Error finding user.")
            res.status(500).send({message: err});
            return;
        }
        if (!user) {
            console.log("Could not find user");
            res.status(400).send({ message: "Could not find user" });
            return;
        }
        var newText = req.body.text;
        console.log(newText)
        // var newNote = new Note({text:newText})
        var newNote = {text: newText}
        user.notes.push(newNote);
        user.save();
        res.send(newNote)
        
    })
}

const editNote = (req,res) => {
    User.findOne({
        _id: req.userId
    }).exec((err, user) => {
        if(err) {
            console.log("Error finding user.")
            res.status(500).send({message: err});
            return;
        }
        if (!user) {
            console.log("Could not find user");
            res.status(400).send({ message: "Could not find user" });
            return;
        }
        var newText = req.body.text;
        if(!user.notes.id(req.body._id)){
            console.log("Could not find note");
            res.status(400).send({ message: "Could not find note" });
            return;
        }
        user.notes.id(req.body._id).text = newText
        user.save();
        res.send(user.notes.id(req.body._id))
        
    })
}

const removeNote = (req,res) => {
    User.findOne({
        _id: req.userId
    }).exec((err, user) => {
        if(err) {
            console.log("Error finding user.")
            res.status(500).send({message: err});
            return;
        }
        if (!user) {
            console.log("Could not find user");
            res.status(400).send({ message: "Could not find user" });
            return;
        }
        if(!user.notes.id(req.body._id)){
            console.log("Could not find note");
            res.status(400).send({ message: "Could not find note" });
            return;
        }
        user.notes.id(req.body._id).remove()
        user.save();
        res.send({test:"test"})
    })
}
module.exports =  {
    getNotes,
    addNote,
    editNote,
    removeNote
};