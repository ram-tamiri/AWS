
const express = require('express');
const app = express();

app.get('/', (req, res) => {
  res.send('API is running');
});


const ordersRoutes = require('./routes/orders');

app.use(express.json());

const cors = require("cors");
app.use(cors({
  origin: "http://localhost:5500"
}));

// Routes
app.use('/orders', ordersRoutes);

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`API running on http://localhost:${PORT}`);
});
