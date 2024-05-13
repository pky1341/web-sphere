import React, { useState, useEffect } from "react";
import { TextField, Button, Typography, Box } from "@mui/material";
import { MuiOtpInput } from "mui-one-time-password-input";
import Swal from "sweetalert2";

interface OTPProps {
  onSubmit: (otp: string) => void;
}

const fetchOtpSession = async (otpSessionId: string) => {
  try {
    const otpDetail = await fetch(`/api/otpAuth/${otpSessionId}`).then((res) =>
      res.json()
    );
    return otpDetail;
  } catch (error) {
    Swal.fire({
      title: "OTP Fetch Error",
      icon: "error",
      text: "could not able to fetch otp details",
    });
    return null;
  }
};

const OtpForm: React.FC<OTPProps> = ({ onSubmit }) => {
  const [otp, setOtp] = useState<string>("");
  const [resendDisabled, setResendDisabled] = useState(false);
  const [expiryTime, setExpiryTime] = useState<number>(0);
  const [otpSessionId, setOtpSessionId] = useState<string>("");
  useEffect(() => {
    const fetchData = async () => {
      const otpSessionId = sessionStorage.getItem("otpSessionId");
      if (otpSessionId) {
        const otpSession = await fetchOtpSession(otpSessionId);
        if (otpSession) {
          setOtpSessionId(otpSessionId);
          setOtp(otpSession.otp.toString());
          setExpiryTime(new Date(otpSession.expiryAt).getTime());
        }
      }
    };
    fetchData();
  }, []);
  useEffect(() => {
    const interval = setInterval(() => {
      if (expiryTime > Date.now()) {
        setExpiryTime(expiryTime - 1000);
      } else {
        setExpiryTime(0);
        setResendDisabled(false);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [expiryTime]);
  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60000);
    const seconds = Math.floor((time % 60000) / 1000);
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
      if (value === otp) {
        Swal.fire({
          title: "Email Verification Successful",
          icon: "success",
          text: "Your email has been successfully verified. You can now log in.",
        });
      }
    }
  };
  const handleResendOTP =async () => {
    setResendDisabled(true);
    try {
      const response = await fetch("/api/otp-sessions/resend", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: "user@example.com" }),
      });

      if (response.ok) {
        const { otpSessionId } = await response.json();
        sessionStorage.setItem("otpSessionId", otpSessionId);
        console.log("OTP resent successfully");
      } else {
        console.error("Failed to resend OTP");
      }
    } catch (error) {
      console.error("Error resending OTP:", error);
    } finally {
      setTimeout(() => {
        setResendDisabled(false);
      }, 300000);
    }
  };
  const handleComplete = (finalValue: string) => {
    fetch("...");
  };
  return (
    <form onSubmit={handleSubmit}>
      <Box sx={{ mb: 2 }}>
        <Typography variant="body1" gutterBottom>
          Please check your email for the OTP. It will expire in{" "}
          <span style={{ color: "red" }}>{formatTime(expiryTime)}</span>{" "}
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
