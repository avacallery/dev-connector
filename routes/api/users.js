const express = require('express');
const router = express.Router();
const gravatar = require('gravatar');
const bcrypt = require('bcryptjs');
const { check, validationResult } = require('express-validator/check');

const User = require('../../models/User');

// @route    POST api/users
// @desc     Register user
// @access   Public

//send name, email, and password in order to register a user

router.post(
  '/',
  [
    check('name', 'Name is required').not().isEmpty(),
    check('email', 'Please include a valid email').isEmail(),
    check(
      'password',
      'Please enter a password with 6 or more characters'
    ).isLength({ min: 6 }),
  ],

  async (req, res) => {
    const errors = validationResult(req);
    //if there are errors, return bad request
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    //deconstruct name, email, and pass from body
    const { name, email, password } = req.body;

    try {
      //make a query with Mongoose
      //See if user exists
      let user = await User.findOne({ email });
      if (user) {
        return res
          .status(400)
          .json({ errors: [{ msg: 'User already exists' }] });
      }
      //Get users gravatar (based on their email)
      const avatar = gravatar.url(email, {
        s: '200',
        r: 'pg',
        d: 'mm',
      });
      //create new instance of user (doesn't actually save user)
      user = new User({
        name,
        email,
        avatar,
        password,
      });

      //Encrypt password using Bcrypt
      //pass in the rounds into genSalt();
      const salt = await bcrypt.genSalt(10);

      user.password = await bcrypt.hash(password, salt);

      //save user to database which returns a promise so we use await
      await user.save();

      //Return jsonwebtoken so user can sign in right away

      res.send('User registered.');
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error');
    }
  }
);

module.exports = router;
