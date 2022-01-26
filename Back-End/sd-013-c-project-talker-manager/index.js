const express = require('express');
const bodyParser = require('body-parser');
const routes = require('./routes/routes');

const app = express();
app.use(bodyParser.json());

const HTTP_OK_STATUS = 200;
const PORT = '3000';

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send({
    message: 'OK',
  });
});

app.use((err, req, res, next) => {
  res.status(err.status).json({ message: `${err.message}` });
  next();
});

app.use(routes);

app.listen(PORT, () => {
  console.log('Online');
});
