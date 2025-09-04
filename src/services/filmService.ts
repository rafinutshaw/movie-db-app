import axios, { type AxiosResponse } from "axios";
import { BASE_URL } from "../../constants";

// Handles direct API calls to TMDB
const ACCESS_TOKEN = import.meta.env.VITE_ACCESS_TOKEN;
const axiosTMDB = axios.create({
  baseURL: BASE_URL,
  headers: {
    Authorization: `Bearer ${ACCESS_TOKEN}`,
    "Content-Type": "application/json;charset=utf-8",
  },
});

export async function getFilms(
  category: "popular" | "top_rated" | "upcoming"
): Promise<AxiosResponse> {
  const url = `/movie/${category}?language=en-US&page=1`;
  return axiosTMDB.get(url);
}

export async function getFilmDetail(id: string): Promise<AxiosResponse> {
  const url = `/movie/${id}?language=en-US`;
  return axiosTMDB.get(url);
}

export async function getCast(id: string): Promise<AxiosResponse> {
  const url = `/movie/${id}/credits?language=en-US`;
  return axiosTMDB.get(url);
}

export async function addToWatchlist(
  accountId: string,
  sessionId: string,
  mediaId: number,
  watchlist: boolean = true
) {
  const url = `/account/${accountId}/watchlist`;
  return axiosTMDB.post(
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
}

export async function getWatchlist(accountId: string, sessionId: string) {
  return axiosTMDB.get(`/account/${accountId}/watchlist/movies`, {
    params: { session_id: sessionId },
  });
}
