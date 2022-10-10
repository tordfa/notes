// CHANGE NAME TO loginController

const User = require('../models/user.model')
const bcrypt = require('bcryptjs')
const jwt = require("jsonwebtoken");

const saltRounds = 10;

const signup = (req, res) => {
    res.send("signup");
    var username = req.query.user
    var password = req.query.password;

    bcrypt.hash(password, saltRounds, function (err, hash) {
        var newuser = new User({ username: username, password: hash });
        newuser.save(function (err, newuser) {
            if (err) return console.error(err);
            console.log("Document inserted succussfully!");
            console.log(newuser)
        });
    });
}

const signin = (req, res) => {
    var username = req.query.user;
    var password = req.query.password;

    console.log("Trying to sign in....")
    User.findOne({
        username: username
    }).exec((err,user) => {
        if(err){
            res.status(500).send({ message: err });
            return;
        }

        if (!user){
            console.log("User not found")
            return res.status(404).send({ message: "User Not found." });
        }
        
        var passwordIsValid = bcrypt.compareSync(password,user.password)

        if(!passwordIsValid){
            console.log("Password not valid")
            return res.status(404).send({ message: "Password is incorrect" });
        }

        console.log("CORRECT PASSWORD")
        var token = jwt.sign({id: user.id}, process.env.SECRET,{
            expiresIn: 86400
        })
        res.cookie("xtoken",token,{httpOnly: true})
        res.status(200).send({
            id: user._id,
            username: user.username
        })
    })
    
}

const signinguest = (req, res) => {

    var username = "Guest" + Math.floor(Math.random()*1000)
    var password = "BLALBALBALBA" + Math.floor(Math.random()*10000);

    bcrypt.hash(password, saltRounds, function (err, hash) {
        var newuser = new User({ username: username, password: hash });
        newuser.save(function (err, newuser) {
            if (err) return console.error(err);
            console.log("Document inserted succussfully!");
            console.log(newuser)
        });
    });
    res.status(200).send({ message: "Created guest user." , username: username, password: password});
    
}

const logout = (req,res) => {
    res.cookie("xtoken","",{httpOnly: true})
    res.status(200).send({ message: "Logging out!" , isLoggedIn: false})
}

module.exports = {
    signup,
    signin,
    signinguest,
    logout
};