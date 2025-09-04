import axios from "axios";
import { BASE_URL } from "../../constants";

const API_KEY = import.meta.env.VITE_API_KEY;

// Step 1: Get request token
export async function getRequestToken(): Promise<string> {
  const res = await axios.get(
    `${BASE_URL}/authentication/token/new?api_key=${API_KEY}`
  );
  return res.data.request_token;
}

// Step 2: Redirect user to TMDB login
export function getLoginUrl(requestToken: string): string {
  return `https://www.themoviedb.org/authenticate/${requestToken}`;
}

// Step 3: Get session ID after user authenticates
export async function getSessionId(requestToken: string): Promise<string> {
  const res = await axios.post(
    `${BASE_URL}/authentication/session/new?api_key=${API_KEY}`,
    {
      request_token: requestToken,
    }
  );
  return res.data.session_id;
}

// Step 4: Get account ID using session ID
export async function getAccountId(sessionId: string): Promise<string> {
  const res = await axios.get(
    `${BASE_URL}/account?api_key=${API_KEY}&session_id=${sessionId}`
  );
  return res.data.id;
}

// Utility: Save session/account info to localStorage
export function saveAuth(sessionId: string, accountId: string) {
  localStorage.setItem("tmdb_session_id", sessionId);
  localStorage.setItem("tmdb_account_id", accountId);
}

export function getSavedAuth() {
  return {
    sessionId: localStorage.getItem("tmdb_session_id"),
    accountId: localStorage.getItem("tmdb_account_id"),
  };
}

export function clearSavedAuth() {
  localStorage.removeItem("tmdb_session_id");
  localStorage.removeItem("tmdb_account_id");
}
