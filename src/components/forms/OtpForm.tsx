import React, { useState } from "react";
import { TextField, Button } from "@mui/material";

interface OTPProps {
  onSubmit: (otp: string) => void;
}

const OtpForm: React.FC<OTPProps> = ({ onSubmit }) => {
  const [otp, setOtp] = useState("");
  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    onSubmit(otp);
  };
  return (
    <>
      <form onSubmit={handleSubmit}>
        <TextField
          label="OTP"
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
          required
          fullWidth
        />
        <Button
          type="submit"
          variant="contained"
          color="primary"
          className="mt-2 w-full"
        >
          Verify OTP
        </Button>
      </form>
    </>
  );
};

export {OtpForm};
