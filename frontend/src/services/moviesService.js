import { api, requestConfig } from "../utils/config";

const getAllMovies = async (page) => {
  const config = requestConfig("GET", null, null);

  try {
    const res = await fetch(`${api}/movies/${page}`, config)
      .then((res) => res.json())
      .catch((err) => ({
        errors: ["Houve um erro, por favor tente mais tarde."],
      }));

    return res;
  } catch (error) {
    console.log(error);
  }
};

const updateDataBase = async () => {
  const config = requestConfig("POST", null, null);

  try {
    const res = await fetch(`${api}/movies/`, config)
      .then((res) => res.json())
      .catch((err) => ({
        errors: ["Houve um erro, por favor tente mais tarde."],
      }));

    return res;
  } catch (error) {
    console.log(error);
  }
};

const moviesService = {
  getAllMovies,
  updateDataBase,
};

export default moviesService;
