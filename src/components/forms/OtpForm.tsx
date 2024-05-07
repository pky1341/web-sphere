import React, { useState, useEffect } from "react";
import { TextField, Button, Typography, Box } from "@mui/material";
import { MuiOtpInput } from "mui-one-time-password-input";

interface OTPProps {
  onSubmit: (otp: string) => void;
}

const OtpForm: React.FC<OTPProps> = ({ onSubmit }) => {
  const [otp, setOtp] = useState<string>("");
  const [resendDisabled, setResendDisabled] = useState(false);
  const [otpExpiryTime, setOtpExpiryTime] = useState(5 * 60);
  useEffect(() => {
    let timer: NodeJS.Timeout | undefined = undefined;
    if (otpExpiryTime > 0) {
      timer = setInterval(() => setOtpExpiryTime(otpExpiryTime - 1), 1000);
    }
    return () => {
      if (timer) {
        clearInterval(timer);
      }
    };
  }, [otpExpiryTime]);
  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes.toString().padStart(2, "0")}:${seconds
      .toString()
      .padStart(2, "0")}`;
  };
  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    onSubmit(otp);
  };
  const handleChange = (value: string) => {
    if (/^\d*$/.test(value)) {
      setOtp(value);
    }
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
      <Box sx={{ mb: 2 }}>
        <Typography variant="body1" gutterBottom>
          Please check your email for the OTP. It will expire in{" "}
          <span style={{ color: "red" }}>{formatTime(otpExpiryTime)}</span>{" "}
          minutes.
        </Typography>
      </Box>
      <MuiOtpInput
        value={otp}
        onChange={handleChange}
        onComplete={handleComplete}
        length={4}
        autoFocus
        validateChar={(character: string, index: number) =>
          /^\d*$/.test(character)
        }
      />
      <Button
        type="submit"
        variant="contained"
        color="primary"
        className="mt-2 w-full"
      >
        Verify OTP
      </Button>
      <Button
        onClick={handleResendOTP}
        disabled={resendDisabled}
        className="mt-2"
      >
        Resend OTP
      </Button>
    </form>
  );
};

export { OtpForm };
