import axios from "axios";
import envVariables from "../../config/variables";

//TODO REMOVE
console.log(envVariables?.apiUrl);

const api = axios.create({
  baseURL: envVariables?.apiUrl,
});

export default api;
