import { z } from "zod";

export const GenreSchema = z.object({
  id: z.number(),
  name: z.string(),
});
export const FilmSchema = z.object({
  id: z.number(),
  title: z.string().min(1, "Title cannot be empty"),
  overview: z.string(),
  poster_path: z.string().nullable(),
  release_date: z.string(),
  vote_average: z.number().min(0).max(10),
  genres: z.array(GenreSchema).min(1).max(5),
  runtime: z.number().min(0),
  tagline: z.string(),
});

export const CastSchema = z.object({
  id: z.number(),
  name: z.string(),
  character: z.string(),
  profile_path: z.string().nullable(),
});

export const CastListSchema = z.array(CastSchema);

export const FilmListSchema = z.array(
  FilmSchema.pick({
    id: true,
    title: true,
    poster_path: true,
  })
);
