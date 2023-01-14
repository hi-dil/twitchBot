import fs from 'fs';

const SetCache = async (data) => {
  const saveData = JSON.stringify(data);
  return await fs.promises.writeFile('src/models/cacheData.json', saveData).catch(err => console.log(err))
}

export default SetCache;