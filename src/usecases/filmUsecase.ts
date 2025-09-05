import { getFilms, getFilmDetail, getCast } from "../services/filmService";
import type { ZodType } from "zod";

export const MESSAGE = {
  SOMETHING_WENT_WRONG: "Something went wrong",
  NOTHING_TO_SHOW: "Nothing to show",
};

export async function fetchFilmsByCategory<T>(
  category: "popular" | "top_rated" | "upcoming",
  schema: ZodType<T>
): Promise<{ films: T | null; error: string | null }> {
  try {
    const data = await getFilms(category);
    const result = schema.parse(data.results);

    return { films: result, error: null };
  } catch (error: any) {
    return {
      films: null,
      error: error?.response?.data?.error || MESSAGE.SOMETHING_WENT_WRONG,
    };
  }
}

export async function fetchFilmDetailUsecase<T>(
  id: string,
  schema: ZodType<T>
): Promise<{ film: T | null; error: string | null }> {
  try {
    const data = await getFilmDetail(id);
    const result = schema.parse(data);

    return { film: result, error: null };
  } catch (err: any) {
    return {
      film: null,
      error: err?.response?.data?.error || MESSAGE.SOMETHING_WENT_WRONG,
    };
  }
}

export async function fetchCastUsecase<T>(
  id: string,
  schema: ZodType<T>
): Promise<{ cast: T | null; error: string | null }> {
  try {
    const data = await getCast(id);
    const result = schema.parse(data.cast);

    return { cast: result, error: null };
  } catch (err: any) {
    return {
      cast: null,
      error: err?.response?.data?.error || MESSAGE.SOMETHING_WENT_WRONG,
    };
  }
}
