const express = require('express');

const productsRoutes = require('./routes/productsRoutes');
const salesRoutes = require('./routes/saleRoutes');

const errorMidleware = require('./middlewares/error.middleware');

const PORT = 3000;
const app = express();

app.use(express.json());

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

app.use('/products', productsRoutes);
app.use('/sales', salesRoutes);
app.use(errorMidleware);

app.listen(PORT, () => console.log(`Listen Port ${PORT}!`));
