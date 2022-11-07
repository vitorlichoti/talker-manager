const express = require('express');
const bodyParser = require('body-parser');
const {
  getAllTalkers,
  getTalkerById,
  addTalker,
  editTalker,
  removeTalker,
} = require('./utils/handleTalkers');

const {
  validateLogin,
  headerValidation,
  nameValidation,
  ageValidation,
  talkValidation,
  watchedFormatValidation,
  rateValidation,
} = require('./utils/validations');
const { tokenGenerator } = require('./utils/tokenGenerator');

const app = express();
app.use(bodyParser.json());
app.use(express.json());

const HTTP_OK_STATUS = 200;
const HTTP_NOT_FOUND_STATUS = 404;
const PORT = '3000';

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

app.listen(PORT, () => {
  console.log('Online');
});

app.get('/talker/search', headerValidation, async (req, res) => {
  const { q } = req.query;

  const talkers = await getAllTalkers();
  return res.json(talkers.filter((e) => e.name.includes(q)));
});

app.get('/talker', async (_req, res) => {
  const talkers = await getAllTalkers();

  if (talkers.length === 0) {
    return res.status(HTTP_OK_STATUS).json([]);
  }
  return res.status(HTTP_OK_STATUS).json(talkers);
});

app.get('/talker/:id', async (req, res) => {
  const { id } = req.params;
  const talker = await getTalkerById(id);
  if (!talker) {
    return res.status(HTTP_NOT_FOUND_STATUS).json({ message: 'Pessoa palestrante não encontrada' });
  }
  return res.status(HTTP_OK_STATUS).json(talker);
});

app.post('/login', validateLogin, async (_req, res) => {
  const token = tokenGenerator();
  return res.status(200).json({ token });
});

app.post(
  '/talker',
  headerValidation,
  nameValidation,
  ageValidation,
  talkValidation,
  watchedFormatValidation,
  rateValidation,
  async (req, res) => {
    const talker = req.body;
    const postTalker = await addTalker(talker);
    return res.status(201).json(postTalker);
  },
  );

app.put(
  '/talker/:id',
  headerValidation,
  nameValidation,
  ageValidation,
  talkValidation,
  watchedFormatValidation,
  rateValidation,
  async (req, res) => {
    const { id } = req.params;
    const talkerUpdates = req.body;
    const talkerUpdated = await editTalker(Number(id), talkerUpdates);
    return res.status(200).json(talkerUpdated);
  },
  );

app.delete('/talker/:id', headerValidation, async (req, res) => {
  const { id } = req.params;
  await removeTalker(Number(id));

  return res.status(204).json();
});