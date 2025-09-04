import { z } from "zod";
import type { WishListFilmSchema } from "../schemas/wishlist.schema";

export type WishListFilm = z.infer<typeof WishListFilmSchema>;
