// Mock authentication and OTP check
export const mockLogin = async (email: string, password: string) => {
  // Simulate API call
  return new Promise(resolve => setTimeout(() => resolve(true), 1000));
};

export const mockRegister = async (email: string, password: string) => {
  return new Promise(resolve => setTimeout(() => resolve(true), 1000));
};

export const mockOtpCheck = async (otp: string) => {
  return new Promise(resolve => setTimeout(() => resolve(otp === '123456'), 1000));
};
