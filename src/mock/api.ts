import { FetchUserResponse, VerifyOtpResponse } from "@shared/types/types.ts";

const mockUserData = {
  phone: "1234567890",
  token: "mockAuthToken123",
  userData: {
    name: "John Doe",
    email: "johndoe@example.com",
  },
};

const otpStorage: Record<string, string> = {};

const generateOtp = (): string => {
  return Math.floor(100000 + Math.random() * 900000).toString();
};

export const requestOtp = (phone: string) => {
  return new Promise((resolve) => {
    const otpCode = generateOtp();
    otpStorage[phone] = otpCode;
    console.log(`OTP sent to ${phone}: ${otpCode}`);
    resolve({ success: true, message: "OTP sent successfully" });
  });
};

export const verifyOtp = (phone: string, otpCode: string) => {
  return new Promise<VerifyOtpResponse>((resolve, reject) => {
    if (otpStorage[phone] === otpCode) {
      const token = "mockAuthToken123";
      delete otpStorage[phone];
      resolve({ success: true, token });
    } else {
      reject({ success: false, message: "Invalid OTP or phone number" });
    }
  });
};

export const fetchProtectedUserData = (
  token: string,
): Promise<FetchUserResponse> => {
  return new Promise((resolve, reject) => {
    if (token === mockUserData.token) {
      resolve({ success: true, data: mockUserData.userData });
    } else {
      reject({ success: false, message: "Invalid token" });
    }
  });
};
