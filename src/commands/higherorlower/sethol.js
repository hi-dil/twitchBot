import axios from "axios";
import WriteRedis from "../../utils/redis/WriteRedis.js";
const setHol = async () => {
  const rediskey = "holquestions";

  const fileLocation = "src/models/holList.json";
  const url = "http://www.higherlowergame.com/questions/get/general";
  const res = await axios.get(url);

  WriteRedis(res.data, rediskey);

  console.log("successfully update hol data");
};

export default setHol;
