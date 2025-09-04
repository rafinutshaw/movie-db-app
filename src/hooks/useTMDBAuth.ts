import { useState, useEffect, useCallback } from "react";
import {
  getRequestToken,
  getLoginUrl,
  getSessionId,
  getAccountId,
  saveAuth,
  getSavedAuth,
} from "../services/tmdbAuthService";
import { useAuthStore } from "../store/useAuthStore";

export function useTMDBAuth() {
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [success, setSuccess] = useState(false);
  const { isLoggedIn, login } = useAuthStore();
  const params = new URLSearchParams(window.location.search);
  const REDIRECT_URL = window.location.origin + "/login";

  useEffect(() => {
    if (!isLoggedIn) {
      setSuccess(false);
      setError(null);
    }
  }, [isLoggedIn]);

  const getLoginUrlWithRedirect = useCallback(
    (requestToken: string) =>
      getLoginUrl(requestToken) +
      `?redirect_to=${encodeURIComponent(REDIRECT_URL)}`,
    [REDIRECT_URL]
  );

  const initiateAuth = async () => {
    setError(null);
    try {
      const requestToken = await getRequestToken();
      window.location.href = getLoginUrlWithRedirect(requestToken);
    } catch (err: any) {
      setError("Failed to get request token");
    }
  };

  const fetchLoginCredentials = useCallback(async (requestToken: string) => {
    setError(null);
    setLoading(true);
    try {
      const session = await getSessionId(requestToken);
      const accId = await getAccountId(session);
      saveAuth(session, accId);
      setSuccess(true);
      login();
      setLoading(false);
    } catch (err: any) {
      setError("Failed to get session/account ID");
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    const { sessionId, accountId } = getSavedAuth();
    if (sessionId && accountId) {
      setSuccess(true);
      return;
    }

    const urlToken = params.get("request_token");
    if (urlToken !== null && params.get("approved") === "true") {
      fetchLoginCredentials(urlToken);
    }
    // eslint-disable-next-line
  }, []);

  return {
    error,
    success,
    initiateAuth,
    loading,
  };
}
