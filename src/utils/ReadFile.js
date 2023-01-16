import fs from 'fs';

const ReadFile = async (location) => {
  const readData = await fs.promises.readFile(location).catch(err => console.log(err))
  return JSON.parse(readData);
}

export default ReadFile