import Constants from "expo-constants";

export const prodUrl = "https://recycling-center-api.herokuapp.com";

const ENV = {
  dev: {
    environment: "DEV",
    apiUrl: "http://192.168.15.5:3333",
  },
  staging: {
    environment: "STAGING",
    apiUrl: prodUrl,
  },
  prod: {
    environment: "PROD",
    apiUrl: prodUrl,
  },
};

function getEnvVars(env = "") {
  if (env === null || env === undefined || env === "") return ENV.dev;
  if (env.indexOf("dev") !== -1) return ENV.dev;
  if (env.indexOf("staging") !== -1) return ENV.staging;
  if (env.indexOf("prod") !== -1) return ENV.prod;
}

export default getEnvVars(Constants.manifest.releaseChannel);
