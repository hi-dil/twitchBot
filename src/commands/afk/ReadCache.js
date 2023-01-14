import fs from 'fs';

const ReadCache = async () => {
  const readData = await fs.promises.readFile('src/models/cacheData.json').catch(err => console.log(err))
  return JSON.parse(readData);
}

export default ReadCache