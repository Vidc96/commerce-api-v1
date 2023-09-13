const { User } = require('../models/user')
const express = require('express')
const router = express.Router()
const bcrypt = require('bcryptjs')

router.post(`/`, async (req, res) => {
  const saltRounds = 10
  let user = new User({
    name: req.body.name,
    email: req.body.email,
    passwordHash: bcrypt.hashSync(req.body.passwordHash, saltRounds),
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