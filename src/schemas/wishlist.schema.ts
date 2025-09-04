import { z } from "zod";

export const WishListFilmSchema = z.object({
  id: z.number(),
  title: z.string(),
  poster_path: z.string().nullable(),
});

export const WishListSchema = z.array(WishListFilmSchema);
