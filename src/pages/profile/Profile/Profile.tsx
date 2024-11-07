import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { useAuthStore } from "@shared/store/useAuthStore";
import { FetchUserResponse } from "@shared/types/types.ts";
import { Typography } from "@shared/ui/Typography/Typography";

import { fetchProtectedUserData } from "@mock/api";

export const Profile = () => {
  const navigate = useNavigate();
  const { setUserData, token } = useAuthStore(); // Используем token из Zustand
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
        }
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [token, setUserData, navigate]);

  const { userData } = useAuthStore();

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Typography variant="t" className="text-center">
          Loading...
        </Typography>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Typography variant="p14" className="text-center text-red-500">
          {error}
        </Typography>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center mt-8 px-4">
      {userData ? (
        <div className="max-w-md w-full bg-white shadow-lg rounded-lg p-6">
          <Typography variant="t" className="text-center mb-4">
            Profile
          </Typography>
          <div className="space-y-4">
            <div className="flex justify-between">
              <Typography variant="p16">Name:</Typography>
              <Typography variant="p16" className="font-semibold">
                {userData.name}
              </Typography>
            </div>
            <div className="flex justify-between">
              <Typography variant="p16">Email:</Typography>
              <Typography variant="p16" className="font-semibold">
                {userData.email}
              </Typography>
            </div>
          </div>
        </div>
      ) : (
        <div>
          <Typography variant="p14">No user data available</Typography>
        </div>
      )}
    </div>
  );
};
