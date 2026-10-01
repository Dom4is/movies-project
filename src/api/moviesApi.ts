import axios from "axios";
import type {
  MovieDetails,
  MovieSearchQuery,
  MovieSearchResponse,
} from "../types/movieTypes";

const API_KEY = import.meta.env.VITE_OMDB_API_KEY;
const BASE_URL = "https://www.omdbapi.com/";

export const searchMoviesApi = async (
  params: MovieSearchQuery,
  signal?: AbortSignal,
): Promise<MovieSearchResponse> => {
  const response = await axios.get<MovieSearchResponse>(BASE_URL, {
    params: {
      apikey: API_KEY,
      ...params,
    },
    signal,
  });
  return response.data;
};

export const getMovieDetails = async (
  id: string,
  signal?: AbortSignal,
): Promise<MovieDetails> => {
  const response = await axios.get<MovieDetails>(BASE_URL, {
    params: {
      apikey: API_KEY,
      i: id,
      plot: "full",
    },
    signal,
  });
  return response.data;
};
