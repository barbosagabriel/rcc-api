import axios from "axios";
import envVariables from "../../config/variables";
import Constants from "expo-constants";

// This is necessary due publishing expo app (expo publish)
// only manifests variables are available
const isDevelopment = envVariables?.environment === "DEV" || false;

const api = axios.create({
  baseURL: isDevelopment
    ? envVariables?.apiUrl
    : Constants.manifest.extra.apiUrlProd,
});

export default api;
