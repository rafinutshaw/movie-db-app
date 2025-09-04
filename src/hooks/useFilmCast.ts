import { useState, useEffect } from "react";
import { fetchCastUsecase } from "../usecases/filmUsecase";
import type { ZodType } from "zod";
import { useParams } from "react-router-dom";

export function useFilmCast<T>(castSchema: ZodType<T>) {
  const [castList, setCastList] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { id } = useParams();

  useEffect(() => {
    if (id) {
      setLoading(true);
      setError(null);

      fetchCastUsecase<T>(id, castSchema).then((data) => {
        setCastList(data.cast);
        setError(data.error);
        setLoading(false);
      });
    }
  }, [id]);

  return { loading, error, castList };
}
