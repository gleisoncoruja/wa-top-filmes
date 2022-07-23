const { default: axios } = require("axios");

const api_key = process.env.TMDB_KEY;

const originApi = axios.create({
  baseURL: "https://api.themoviedb.org/3/movie",
  params: {
    api_key: api_key,
    language: "pt-BR",
  },
});

module.exports = originApi;
