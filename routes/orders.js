const express = require('express');
const router = express.Router();
const { Order } = require('../models/order');
const { OrderItem } = require('../models/order-item');

// Obtener todas las órdenes
router.get('/', async (req, res) => {
  try {
    const orders = await Order.find()
      .populate('user', 'name')
      .sort({ dateOrdered: -1 });

    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener las órdenes' });
  }
});

// Obtener una orden por ID
router.get('/:id', async (req, res) => {
  try {
    const order = await Order.findById(req.params.id)
      .populate('user', 'name')
      .populate({
        path: 'orderItems',
        populate: { path: 'product', populate: 'category' },
      });

    if (!order) {
      return res.status(404).json({ error: 'Orden no encontrada' });
    }

    res.status(200).json(order);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener la orden' });
  }
});

// Crear una nueva orden
router.post('/', async (req, res) => {
  try {
    const orderItemsIds = await Promise.all(
      req.body.orderItems.map(async (orderItem) => {
        let newOrderItem = new OrderItem({
          quantity: orderItem.quantity,
          product: orderItem.product,
        });
        newOrderItem = await newOrderItem.save();
        return newOrderItem._id;
      })
    );

    const totalPrices = await Promise.all(
      orderItemsIds.map(async (orderItemId) => {
        const orderItem = await OrderItem.findById(orderItemId).populate(
          'product',
          'price'
        );
        const totalPrice = orderItem.product.price * orderItem.quantity;
        return totalPrice;
      })
    );

    const totalPrice = totalPrices.reduce((a, b) => a + b, 0);

    let order = new Order({
      orderItems: orderItemsIds,
      shippingAddress1: req.body.shippingAddress1,
      shippingAddress2: req.body.shippingAddress2,
      city: req.body.city,
      zip: req.body.zip,
      country: req.body.country,
      phone: req.body.phone,
      status: req.body.status || 'Pending',
      totalPrice: totalPrice,
      user: req.body.user,
    });

    order = await order.save();

    if (!order) {
      return res.status(400).json({ error: 'No se pudo crear la orden' });
    }

    res.status(201).json(order);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al crear la orden' });
  }
});

// Actualizar el estado de una orden
router.put('/:id', async (req, res) => {
  try {
    const order = await Order.findByIdAndUpdate(
      req.params.id,
      {
        status: req.body.status,
      },
      { new: true }
    );

    if (!order) {
      return res.status(404).json({ error: 'Orden no encontrada' });
    }

    res.status(200).json(order);
  } catch (error) {
    res.status(500).json({ error: 'Error al actualizar la orden' });
  }
});

// Eliminar una orden
router.delete('/:id', async (req, res) => {
  try {
    const order = await Order.findByIdAndRemove(req.params.id);

    if (!order) {
      return res.status(404).json({ error: 'Orden no encontrada' });
    }

    // También eliminamos los items de la orden
    await Promise.all(
      order.orderItems.map(async (orderItem) => {
        await OrderItem.findByIdAndRemove(orderItem);
      })
    );

    res.status(200).json({ message: 'Orden eliminada con éxito' });
  } catch (error) {
    res.status(500).json({ error: 'Error al eliminar la orden' });
  }
});

module.exports = router;
