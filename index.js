const express=require("express")
const app=express();
const { body, validationResult } = require('express-validator');
const User = require("./models/userSchema");
require("./db-connection")

app.use(express.json());
app.use(express.urlencoded({extended: false}))

app.post(
  '/user',
  body('username').isEmail(),
  body('password').isLength({ min: 5 }),
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    User.create({
      username: req.body.username,
      password: req.body.password,
    }).then(user => res.json(user));
  },
);

app.listen(8000);