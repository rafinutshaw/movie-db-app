import type { z } from "zod";
import type {
  CastSchema,
  FilmListSchema,
  FilmSchema,
} from "../schemas/film.schema";

export type Cast = z.infer<typeof CastSchema>;

export type Film = z.infer<typeof FilmSchema>;
export type FilmList = z.infer<typeof FilmListSchema>;
