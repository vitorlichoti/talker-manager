const express = require('express');
const bodyParser = require('body-parser');
const { getAllTalkers } = require('./utils/handleTalkers');

const app = express();
app.use(bodyParser.json());
app.use(express.json());

const HTTP_OK_STATUS = 200;
const PORT = '3000';

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

app.listen(PORT, () => {
  console.log('Online');
});

app.get('/talker', async (_req, res) => {
  const talkers = await getAllTalkers();

  if (talkers.length === 0) {
    res.status(200).json([]);
  }
  res.status(200).json(talkers);
});