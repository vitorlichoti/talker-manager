const { readFile, writeFile } = require('fs/promises');
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

const addTalker = async (talker) => {
  const talkers = await getAllTalkers();
  const id = talkers[talkers.length - 1].id + 1;
  talkers.push({
    id,
    ...talker,
  });
  await writeFile(talkerPath, JSON.stringify(talkers, null, 2));
  return {
    id,
    ...talker,
  };
};

const editTalker = async (id, updates) => {
  const oldTalkers = await getAllTalkers();
  const updatedTalker = { id, ...updates };
  const talkerListUpdate = oldTalkers.reduce((talkersList, currentTalker) => {
    if (currentTalker.id === updatedTalker.id) {
      return [...talkersList, updatedTalker];
    }
    return [...talkersList, currentTalker];
  }, []);

  const updatedData = JSON.stringify(talkerListUpdate);

  await writeFile(talkerPath, updatedData);
  return updatedTalker;
};

module.exports = {
  getAllTalkers,
  getTalkerById,
  addTalker,
  editTalker,
};
