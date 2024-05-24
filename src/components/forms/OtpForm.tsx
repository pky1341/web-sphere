import React, { useState, useEffect } from "react";
import { TextField, Button, Typography, Box } from "@mui/material";
import { MuiOtpInput } from "mui-one-time-password-input";
import Swal from "sweetalert2";
interface OTPFormProps {
  onSubmit: () => void;
  email: string;
  onClose: () => void;
}
const fetchOtpSession = async (otpSessionId: string, email: string) => {
  try {
    const otpDetail = await fetch(
      `/api/otpAuth/${otpSessionId}?email=${email}`
    ).then((res) => res.json());
    return otpDetail;
  } catch (error) {
    Swal.fire({
      title: "OTP Fetch Error",
      icon: "error",
      text: "Could not fetch OTP details. Please try again.",
    });
    return null;
  }
};

const OtpForm: React.FC<OTPFormProps> = ({ onSubmit, email, onClose }) => {
  const [otp, setOtp] = useState<string>("");
  const [resendDisabled, setResendDisabled] = useState<boolean>(false);
  const [expiryTime, setExpiryTime] = useState<number>(300000);
  const [otpSessionId, setOtpSessionId] = useState<string>("");
  const [isVerifying, setIsVerifying] = useState<boolean>(false);

  useEffect(() => {
    const fetchData = async () => {
      const otpSessionId = sessionStorage.getItem("otpSessionId");
      if (otpSessionId) {
        const otpSession = await fetchOtpSession(otpSessionId, email);
        if (otpSession) {
          setOtpSessionId(otpSessionId);
          setOtp(otpSession.otp.toString());
          const expiryTimeMs = new Date(otpSession.expiryAt).getTime();
          const currentTime = Date.now();
          setExpiryTime(expiryTimeMs - currentTime);
          setResendDisabled(currentTime > expiryTimeMs);
        }
      }
    };
    fetchData();
  }, [email]);

  useEffect(() => {
    setResendDisabled(false);
    const interval = setInterval(() => {
      if (expiryTime > 0) {
        setExpiryTime(expiryTime - 1000);
      } else {
        setExpiryTime(0);
        setResendDisabled(true);
        // setTimeout(() => {
        //   setResendDisabled(true);
        // }, 300000);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [expiryTime]);

  useEffect(() => {
    if (otp.length === 4) {
      verifyOTP(otp);
    }
  }, [otp]);
  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60000);
    const seconds = Math.floor((time % 60000) / 1000);
    return `${minutes.toString().padStart(2, "0")}:${seconds
      .toString()
      .padStart(2, "0")}`;
  };

  const handleChange = (value: string) => {
    if (/^\d*$/.test(value)) {
      setOtp(value);
      // if (value.length === 4) {
      //   verifyOTP(value);
      // }
    }
  };

  const handleResendOTP = async () => {
    setResendDisabled(true);
    try {
      const response = await fetch("/api/otpAuth/resend", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: email }),
      });
      // console.log(response);
      if (response.ok) {
        const { otpSessionId } = await response.json();
        sessionStorage.setItem("otpSessionId", otpSessionId);
        const otpSession = await fetchOtpSession(otpSessionId, email);
        if (otpSession) {
          setOtpSessionId(otpSessionId);
          setOtp(otpSession.otp.toString());
          const expiryTimeMs = new Date(otpSession.expiryAt).getTime();
          const currentTime = Date.now();
          setExpiryTime(expiryTimeMs - currentTime);
          setResendDisabled(false);
          console.log("OTP resent successfully");
        }
      } else {
        console.error("Failed to resend OTP");
        // setTimeout(() => {
        //   setResendDisabled(false);
        // }, 300000);
      }
    } catch (error) {
      console.error("Error resending OTP:", error);
      // setTimeout(() => {
      //   setResendDisabled(false);
      // }, 300000);
    } finally {
      setTimeout(() => {
        setResendDisabled(false);
      }, 300000);
    }
  };

  const verifyOTP = async (finalValue: string) => {
    setIsVerifying(true);
    try {
      const otpSessionId = sessionStorage.getItem("otpSessionId");

      if (otpSessionId) {
        const otpSession = await fetchOtpSession(otpSessionId, email);
        if (otpSession) {
          const { otp, expiryAt } = otpSession;
          const currentTime = Date.now();
          const expiryTimeMs = new Date(expiryAt).getTime();

          if (finalValue === otp.toString() && currentTime <= expiryTimeMs) {
            Swal.fire({
              title: "OTP Verification Successful",
              icon: "success",
              text: "Your OTP has been successfully verified.",
            });
            setIsVerifying(false);
          } else if (currentTime > expiryTimeMs) {
            Swal.fire({
              title: "OTP Expired",
              icon: "error",
              text: "Your OTP has expired. Please request a new one.",
            });
            setIsVerifying(false);
          } else {
            Swal.fire({
              title: "Invalid OTP",
              icon: "error",
              text: "The OTP you entered is invalid. Please try again.",
            });
            setIsVerifying(false);
          }
        } else {
          Swal.fire({
            title: "OTP Session Not Found",
            icon: "error",
            text: "An error occurred while verifying your OTP. Please try again.",
          });
          setIsVerifying(false);
        }
      } else {
        Swal.fire({
          title: "OTP Session Not Found",
          icon: "error",
          text: "An error occurred while verifying your OTP. Please try again.",
        });
        setIsVerifying(false);
      }
    } catch (error) {
      Swal.fire({
        title: "Error",
        icon: "error",
        text: "An error occurred while verifying your OTP. Please try again.",
      });
      setIsVerifying(false);
    }
  };

  return (
    <div>
      <Box sx={{ mb: 2 }}>
        <Typography variant="body1" gutterBottom>
          Please check your email for the OTP. It will expire in{" "}
          <span style={{ color: "red" }}>{formatTime(expiryTime)}</span>.
        </Typography>
      </Box>
      <MuiOtpInput
        value={otp}
        onChange={handleChange}
        length={4}
        autoFocus
        validateChar={(character: string, index: number) =>
          /^\d*$/.test(character)
        }
      />
      <Button
        onClick={() => verifyOTP(otp)}
        disabled={isVerifying || !otp.match(/^\d{4}$/)}
        variant="contained"
        className="mt-2 w-full"
      >
        {isVerifying ? "Verifying..." : "Verify"}
      </Button>
      <Button
        onClick={handleResendOTP}
        disabled={!resendDisabled}
        className="mt-2"
      >
        Resend OTP
      </Button>
    </div>
  );
};

export default OtpForm;
