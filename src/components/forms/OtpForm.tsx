import React, { useState, useEffect } from "react";
import { TextField, Button } from "@mui/material";
import { MuiOtpInput } from "mui-one-time-password-input";

interface OTPProps {
  onSubmit: (otp: string) => void;
}

const OtpForm: React.FC<OTPProps> = ({ onSubmit }) => {
  const [otp, setOtp] = useState<string>("");
  const [resendDisabled, setResendDisabled] = useState(false);
  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    onSubmit(otp);
  };
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setOtp(event.target.value);
  };
  const handleResendOTP = () => {
    setResendDisabled(true);
    console.log("Resending OTP...");
    setTimeout(() => {
      setResendDisabled(false);
    }, 300000);
  };
  const handleComplete = (finalValue: string) => {
    fetch("...");
  };
  return (
    <form onSubmit={handleSubmit}>
      <MuiOtpInput
        value={otp}
        onChange={handleChange}
        onComplete={handleComplete}
        length={4}
        autoFocus
        validateChar={(character: string, index: number) => true}
      />
      <Button type="submit" variant="contained" color="primary" className="mt-2 w-full">
        Verify OTP
      </Button>
      <Button onClick={handleResendOTP} disabled={resendDisabled} className="mt-2 ">
        Resend OTP
      </Button>
    </form>
  );
};

export { OtpForm };
