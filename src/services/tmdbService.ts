// Utility for fetching films from TheMovieDatabase API

import { BASE_URL } from "../../constants";

const API_KEY = import.meta.env.VITE_API_KEY;

export async function fetchFilms(
  category: "popular" | "top_rated" | "upcoming"
) {
  const url = `${BASE_URL}/movie/${category}?api_key=${API_KEY}&language=en-US&page=1`;
  const res = await fetch(url);
  if (!res.ok) throw new Error("Failed to fetch films");
  const data = await res.json();
  return data.results;
}

export async function fetchFilmDetail(id: string) {
  const url = `${BASE_URL}/movie/${id}?api_key=${API_KEY}&language=en-US`;
  const res = await fetch(url);
  if (!res.ok) throw new Error("Failed to fetch film detail");
  return await res.json();
}
