const express = require("express");
const bcrypt = require('bcryptjs')
const router = express.Router();

// User Model
const User = require("../../model/User");

// @route POST api/users
// @decs Register new user
// @access Public
router.post("/", (req, res) => {
  const {username, email, password} = req.body;

  // Simple Validations
  if(!username || !email || !password){
      return res.status(400).json({
          message: "Please enter all fields"
      });
  }
  //
  User.findOne({ email }).then(user => {
      if(user){
          return res.status(400).json({
              message: "User already exist"
          })
      }
      const newUser = new User({
          username,
          email,
          password
      });

      // Create salt and hash
      bcrypt.genSalt(10, (err, salt) => {
          bcrypt.hash(newUser.password, salt, (err, hash) => {
              if(err) throw err;
              newUser.password = hash;
              newUser.save().then(user => {
                  res.json({
                      user: {
                          id: user.id,
                          username: user.username,
                          email: user.email
                      }
                  });
              });
          });
      });
  });
});

module.exports = router;
