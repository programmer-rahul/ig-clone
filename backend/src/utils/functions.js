export const generateOtp = () => {
  const otp = Math.floor(Math.random() * 999998);
  return String(Math.floor(Math.random() * 999998)).length === 6
    ? otp
    : generateOtp();
};
