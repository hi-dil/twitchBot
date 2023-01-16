import fs from 'fs';

const WriteFile = async (data, location) => {
  const saveData = JSON.stringify(data);
  return await fs.promises.writeFile(location, saveData).catch(err => console.log(err))
}

export default WriteFile;