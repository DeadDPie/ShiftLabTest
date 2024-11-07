import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { useAuthStore } from "@shared/store/useAuthStore";
import { FetchUserResponse } from "@shared/types/types";

import { fetchProtectedUserData } from "@mock/api";

export const useFetchUserData = () => {
  const navigate = useNavigate();
  const { setUserData, token, userData } = useAuthStore();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUserData = async () => {
      if (!token) {
        navigate("/");
        return;
      }
      try {
        const response: FetchUserResponse = await fetchProtectedUserData(token);
        if (response.success && response.data) {
          setUserData(response.data);
        } else {
          setError("Не удалось получить данные пользователя");
        }
      } catch (error: unknown) {
        if (error instanceof Error) {
          console.error(error.message);
          setError("Ошибка при загрузке данных пользователя");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [token, setUserData, navigate]);

  return { loading, error, userData };
};
