import axios from "axios";
import WriteFile from "../utils/WriteFile.js";
const setHol = async () => {

  const fileLocation = 'src/models/holList.json'
  const url = 'http://www.higherlowergame.com/questions/get/general';
  const res = await axios.get(url)

  WriteFile(res.data, fileLocation)

  console.log('successfully update hol data');
}

export default setHol;