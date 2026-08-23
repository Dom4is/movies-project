import axios from "axios";
import type { MovieDetails, MovieSearchResponse } from "../types/movieTypes";

const API_KEY = import.meta.env.VITE_OMDB_API_KEY;
const BASE_URL = "http://www.omdbapi.com/";

export const searchMoviesApi = async (params: {
  s: string;
  y?: string;
  type?: "movie" | "series" | "episode";
}): Promise<MovieSearchResponse> => {
  const response = await axios.get<MovieSearchResponse>(BASE_URL, {
    params: {
      apikey: API_KEY,
      ...params,
    },
  });
  return response.data;
};

export const getMovieDetails = async (id: string): Promise<MovieDetails> => {
  const response = await axios.get<MovieDetails>(BASE_URL, {
    params: {
      apikey: API_KEY,
      i: id,
      plot: "full",
    },
  });
  return response.data;
};
