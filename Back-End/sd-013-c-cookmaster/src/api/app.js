const express = require('express');

const usersRouter = require('../routes/userRoutes');
const loginRouter = require('../routes/loginRoutes');
const recipesRouter = require('../routes/recipesRoutes');
const error = require('../middlewares/error.middleware');

const app = express();

app.use(express.json());

// Não remover esse end-point, ele é necessário para o avaliador
app.get('/', (request, response) => {
  response.send();
});
// Não remover esse end-point, ele é necessário para o avaliador

app.use('/users', usersRouter);
app.use('/login', loginRouter);
app.use('/recipes', recipesRouter);

app.use(error);

module.exports = app;
