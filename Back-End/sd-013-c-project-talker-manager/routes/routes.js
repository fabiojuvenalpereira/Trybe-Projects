const express = require('express');
const fileReader = require('../utils/fileReader');
const setTalker = require('../utils/setTalker');
const tokenGenerate = require('../utils/tokenGenerate');
const deleteTalker = require('../utils/deleteTalker');
const validateEmail = require('../middlewares/authorizations/validateEmail');
const validatePassword = require('../middlewares/authorizations/validatePassword');
const tokenValidation = require('../middlewares/tokenValidations/tokenValidation');
const { nameValidation } = require('../middlewares/createTalkerValidations/nameValidation');
const ageValidation = require('../middlewares/createTalkerValidations/ageValidation');
const { 
  talkExists,
  talkValidationWatchedAt,
  talkValidationRate,
} = require('../middlewares/createTalkerValidations/talkValidation');
const editTalker = require('../utils/editTalker');

const router = express.Router();

router.get('/talker', (_req, res) => {
  const archive = fileReader();
  return res.status(200).json(archive);
});

router.get('/talker/:id', (req, res) => {
  const archive = fileReader();
  const { id } = req.params;
  const userToreturn = archive.find((user) => user.id === Number(id));
  if (userToreturn) return res.status(200).json(userToreturn);
  
  return res.status(404).json({ message: 'Pessoa palestrante não encontrada' });
});

router.post('/login', validateEmail, validatePassword, (req, res) => {
  const tkn = tokenGenerate();
  return res.status(200).json({ token: tkn });
});

router.post(
  '/talker',
  tokenValidation,
  nameValidation,
  ageValidation,
  talkExists,
  talkValidationWatchedAt,
  talkValidationRate,
  (req, res) => {
    const { name, age, talk } = req.body;
    const archive = fileReader();

    const newTalker = {
      id: archive.length + 1,
      name,
      age,
      talk,
    };

    archive.push(newTalker);
    setTalker(archive);

    return res.status(201).json(newTalker);
  },
);

router.put(
  '/talker/:id',
  tokenValidation,
  nameValidation,
  ageValidation,
  talkExists,
  talkValidationWatchedAt,
  talkValidationRate,
  (req, res) => {
    const archive = fileReader();
    const editedTalker = editTalker(req, archive);
    res.status(200).json(editedTalker);
  },
);

router.delete(
  '/talker/:id',
  tokenValidation,
  (req, res) => {
    const archive = fileReader();
    const talkerDelete = deleteTalker(req, archive);
    res.status(200).json(talkerDelete);
  },
);

module.exports = router;