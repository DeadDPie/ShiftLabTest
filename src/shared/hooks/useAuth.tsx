import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { useAuthStore } from "@shared/store/useAuthStore";
import { SignInSchemaType, VerifyOtpResponse } from "@shared/types/types.ts";

import { requestOtp, verifyOtp } from "@mock/api.ts";

export const useAuth = () => {
  const { setToken } = useAuthStore();
  const navigate = useNavigate();
  const [otp, setOtp] = useState<boolean>(false);

  const handleOtpRequest = async (phone: string) => {
    try {
      await requestOtp(phone);
      setOtp(true);
    } catch (error) {
      console.error("OTP request failed:", error);
    }
  };

  const handleOtpVerification = async (data: SignInSchemaType) => {
    try {
      const response: VerifyOtpResponse = await verifyOtp(
        data.phone,
        data.code,
      );
      console.log("OTP verification successful", response);
      setToken(response.token);
      navigate("/profile");
    } catch (error) {
      console.error("OTP verification failed:", error);
    }
  };

  return { otp, setOtp, handleOtpRequest, handleOtpVerification };
};
