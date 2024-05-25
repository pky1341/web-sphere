export function generateNumericOTP(length:number) {
  let otp;
  do {
    otp = Math.floor(Math.pow(10, length - 1) + Math.random() * (Math.pow(10, length) - Math.pow(10, length - 1)));
  } while (otp.toString().length!== length);
  return otp.toString();
}