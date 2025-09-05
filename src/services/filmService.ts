import axios from "axios";
import { BASE_URL } from "../../constants";
import type { Film, FilmList, Cast } from "../types/film.type";

// Handles direct API calls to TMDB
const ACCESS_TOKEN = import.meta.env.VITE_ACCESS_TOKEN;
const axiosTMDB = axios.create({
  baseURL: BASE_URL,
  headers: {
    Authorization: `Bearer ${ACCESS_TOKEN}`,
    "Content-Type": "application/json;charset=utf-8",
  },
});

export interface FilmsResponse {
  results: Pick<Film, "id" | "title">[];
}

export interface CastResponse {
  cast: Cast[];
}
export async function getFilms(
  category: "popular" | "top_rated" | "upcoming"
): Promise<FilmsResponse> {
  const url = `/movie/${category}?language=en-US&page=1`;
  const response = await axiosTMDB.get<FilmsResponse>(url);
  return response.data;
}

export async function getFilmDetail(id: string): Promise<Film> {
  const url = `/movie/${id}?language=en-US`;
  const response = await axiosTMDB.get<Film>(url);
  return response.data;
}

export async function getCast(id: string): Promise<CastResponse> {
  const url = `/movie/${id}/credits?language=en-US`;
  const response = await axiosTMDB.get<CastResponse>(url);
  return response.data;
}

export interface AddToWatchlistResponse {
  status_code: number;
  status_message: string;
}

export async function addToWatchlist(
  accountId: string,
  sessionId: string,
  mediaId: number,
  watchlist: boolean = true
): Promise<AddToWatchlistResponse> {
  const url = `/account/${accountId}/watchlist`;
  const response = await axiosTMDB.post<AddToWatchlistResponse>(
    url,
    {
      media_type: "movie",
      media_id: mediaId,
      watchlist,
    },
    {
      params: { session_id: sessionId },
    }
  );
  return response.data;
}

export async function getWatchlist(accountId: string, sessionId: string) {
  return axiosTMDB.get(`/account/${accountId}/watchlist/movies`, {
    params: { session_id: sessionId },
  });
}
