import { useState, useEffect } from "react";
import { fetchFilmsByCategory } from "../usecases/filmUsecase";
import type { ZodSchema } from "zod";

export function useFilmsByCategory<T>(
  category: "popular" | "top_rated" | "upcoming",
  schema: ZodSchema<T>,
  ssrError?: string
) {
  const [films, setFilms] = useState<T | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(ssrError ?? null);

  useEffect(() => {
    setLoading(true);
    setError(null);
    fetchFilmsByCategory<T>(category, schema).then(({ films, error }) => {
      setFilms(films);
      setError(error);
      setLoading(false);
    });
  }, []);

  return { films, loading, error };
}
