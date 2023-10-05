const { User } = require('../models/user')
const express = require('express')
const router = express.Router()
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

router.post(`/`, async (req, res) => {
  const saltRounds = 10
  let user = new User({
    name: req.body.name,
    email: req.body.email,
    passwordHash: bcrypt.hashSync(req.body.passwordHash, saltRounds),
    phone: req.body.phone,
    isAdmin: req.body.isAdmin,
    street: req.body.street,
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

router.post(`/login`, async (req, res) => {
  const user = await User.findOne({email: req.body.email})
  const secret = process.env.SECRET

  if(!user) {
    return res.status(400).send(`User don't found!`)
  }

  if(user && bcrypt.compareSync(req.body.passwordHash, user.passwordHash)) {
    const token = jwt.sign(
      {
        userId: user.id,
        isAdmin: user.isAdmin
      },
      secret,
      {expiresIn: '1d'}
    )
    res.status(200).send({user: user.email, token: token})
  } else {
    res.status(400).send(`Password is wrong!.`)
  }

})

module.exports = router