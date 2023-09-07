const { Product } = require('../models/product');
const express = require('express');
const mongoose = require('mongoose');
const {Category} = require("../models/category");
const router = express.Router()


router.get(`/`, async (req, res) => {
  const productList = await Product.find()

  if(!productList) {
    res.status(500).json({success: false})
  }
  res.send(productList)
})

router.post(`/`, async (req, res) => {
  const category = await Category.find(req.body.category)
  if(!category) return res.status(400).send('Invalid Category')
  let product = new Product({
    name: req.body.name,
    description: req.body.description,
    richDescription: req.body.richDescription,
    image: req.body.image,
    brand: req.body.brand,
    price: req.body.price,
    category: req.body.category,
    countInStock: req.body.countInStock,
    rating: req.body.rating,
    isFeatured: req.body.isFeatured,
  })

  product = await product.save()
      if (!product) {
            return res.status(500).send('The product cannot be created')
      } else {
        res.send(product)
      }
})

module.exports = router