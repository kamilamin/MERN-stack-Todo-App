const express = require ('express');
const bcrypt = require ('bcryptjs');
const config = require ('config');
const jwt = require ('jsonwebtoken');
const auth = require ('../../middleware/auth');

const router = express.Router ();

// User Model
const User = require ('../../model/User');

// @route POST api/auth
// @decs Auth user
// @access Public

router.post ('/', (req, res) => {
  const {email, password} = req.body;

  // Simple Validations
  if (!email || !password) {
    return res.status (400).json ({
      message: 'Please enter all fields',
    });
  }
  //
  User.findOne ({email}).then (user => {
    if (!user) {
      return res.status (400).json ({
        message: 'User does not exist',
      });
    }

    // Validate Password
    bcrypt.compare (password, user.password).then (isMatch => {
      if (!isMatch)
        return res.status (400).json ({message: 'Invalid Password'});

      jwt.sign (
        {id: user.id},
        config.get ('jwtSecret'),
        {expiresIn: 3600},
        (err, token) => {
          if (err) throw err;
          res.json ({
            token,
            user: {
              id: user.id,
              username: user.username,
              email: user.email,
            },
          });
        }
      );
    });
  });
});

// @route GET api/auth/user
// @decs GET User Data
// @access Private
router.get ('/user', auth, (req, res) => {
  User.findById (req.user.id)
    .select ('-password')
    .then (user => res.json (user));
});

module.exports = router;
