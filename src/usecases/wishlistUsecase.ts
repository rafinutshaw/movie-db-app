import { WishListFilmSchema } from "../schemas/wishlist.schema";
import { addToWatchlist, getWatchlist } from "../services/filmService";
import type { WishListFilm } from "../types/wishlist.type";

export async function addFilmToWishList(
  film: WishListFilm,
  schema: typeof WishListFilmSchema,
  onError: (error: string) => void,
  accountId: string,
  sessionId: string
): Promise<boolean> {
  const result = schema.safeParse(film);
  if (!result.success) {
    onError("Validation error: " + JSON.stringify(result.error));
    return false;
  }
  try {
    await addToWatchlist(accountId, sessionId, film.id);
    return true;
  } catch (err: any) {
    onError("API error: " + err.message);
    return false;
  }
}

export function ensureTMDBAuth() {
  const accountId = localStorage.getItem("tmdb_account_id");
  const sessionId = localStorage.getItem("tmdb_session_id");
  if (!accountId || !sessionId) {
    window.location.href = "/login";
    return { accountId: null, sessionId: null };
  }
  return { accountId, sessionId };
}

export async function addFilmToTMDBWatchList(
  id: number
): Promise<{ result: boolean; error?: string }> {
  const { accountId, sessionId } = ensureTMDBAuth();
  if (!accountId || !sessionId) return { result: false, error: "Unauthorized" };
  try {
    await addToWatchlist(accountId, sessionId, id, true);
    return { result: true };
  } catch (err: any) {
    console.log(err);
    return { result: false, error: err.message };
  }
}

export async function removeFilmFromTMDBWatchList(
  id: number
): Promise<{ result: boolean; error?: string }> {
  const { accountId, sessionId } = ensureTMDBAuth();
  if (!accountId || !sessionId) return { result: false, error: "Unauthorized" };
  try {
    await addToWatchlist(accountId, sessionId, id, false);
    return { result: true };
  } catch (err: any) {
    console.log(err);
    return { result: false, error: err.message };
  }
}

export async function fetchTMDBWishList(): Promise<{
  items: WishListFilm[];
  error: string | null;
}> {
  const { accountId, sessionId } = ensureTMDBAuth();
  if (!accountId || !sessionId) return { items: [], error: "Unauthorized" };
  try {
    const res = await getWatchlist(accountId, sessionId);
    return { items: res.data.results || [], error: null };
  } catch (err: any) {
    console.log(err);
    return { items: [], error: "Failed to fetch watchlist" };
  }
}
