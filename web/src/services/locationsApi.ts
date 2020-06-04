import axios from "axios";

const locationsApi = axios.create({
  baseURL: "https://servicodados.ibge.gov.br/api/v1/localidades",
});

// interface IBGEStateResponse {
//   sigla: String;
// }

export default locationsApi;
