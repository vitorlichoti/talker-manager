const { readFile } = require('fs/promises');
const path = require('path');

const talkerPath = path.resolve(__dirname, '..', 'talker.json');

const getAllTalkers = async () => {
  const response = await readFile(talkerPath, 'utf-8');
  const talkers = JSON.parse(response);
  return talkers;
};

const getTalkerById = async (id) => {
  const response = await readFile(talkerPath, 'utf-8');
  const talkers = JSON.parse(response);
  return talkers.find((e) => e.id === Number(id));
};

module.exports = {
  getAllTalkers,
  getTalkerById,
};
