const express = require('express');
const cors = require('cors');

const errorMiddleware = require('../middlewares/errorMiddleware');

const userRouter = require('../router/userRouter/userRouter');
const productRouter = require('../router/productRouter/productRouter');
const saleRouter = require('../router/saleRouter/saleRouter');
const admRouter = require('../router/userRouter/admRouter');
const sellerRouter = require('../router/userRouter/seller.Router');

const app = express();
app.use(express.json());
app.use(cors());
app.use(express.static('public'));

// User
app.use('/', userRouter);

// Product
app.use('/products', productRouter);

// Sales
app.use('/sales', saleRouter);

// Adm
app.use('/admin', admRouter);

// seller
app.use('/sellers', sellerRouter);

// coffee
app.get('/coffee', (_req, res) => res.status(418).end());

app.use(errorMiddleware);

module.exports = app;
