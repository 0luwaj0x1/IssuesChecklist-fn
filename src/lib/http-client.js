const axios = require("axios");

const getRequest = (parameters) =>
  new Promise((resolve, reject) => {
    const { url } = parameters;
    axios
      .get(url)
      .then((response) => {
        resolve(response.data);
      })
      .catch((error) => {
        reject(error);
      });
  });


  module.exports = { getRequest }