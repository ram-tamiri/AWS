const express = require('express');
const router = express.Router();

const authenticate = require('../middleware/authenticate');
const authorize = require('../middleware/authorize');

// GET /orders → read
router.get(
  '/',
  // authenticate,
  authorize('order-api/read'),
  (req, res) => {
    res.json({ message: 'Orders read allowed' });
  }
);

// POST /orders → write
router.post(
  '/',
  authenticate,
  authorize('order-api/write'),
  (req, res) => {
    res.json({ message: 'Orders write allowed' });
  }
);

module.exports = router;
