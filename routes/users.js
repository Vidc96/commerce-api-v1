const { User } = require('../models/user');
const express = require('express');
const router = express.Router()

router.post(`/`, async (req, res) => {
  let user = new User({
    name: req.body.name,
    email: req.body.email,
    passwordHash: req.body.passwordHash,
    phone: req.body.phone,
    isAdmin: req.body.isAdmin,
    street: req.body.stree,
    apartment: req.body.apartment,
    zip: req.body.zip,
    city: req.body.city,
    country: req.body.country,
    
  })
  user = await user.save()

  if(!user)
  return res.status(400).send('The user cannot be creted!')

  res.send(user)
})

module.exports = router