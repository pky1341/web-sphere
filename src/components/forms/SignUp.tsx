import React, { useState, useEffect } from "react";
import Modal from "react-modal";
import {
  Box,
  Button,
  TextField,
  Typography,
  Divider,
  CircularProgress,
} from "@mui/material";
import GoogleIcon from "@mui/icons-material/Google";
import FacebookIcon from "@mui/icons-material/Facebook";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import GitHubIcon from "@mui/icons-material/GitHub";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { CheckBox } from "@mui/icons-material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import { signIn } from "next-auth/react";
import Swal from "sweetalert2";
import {OtpForm} from "./OtpForm";

const dataValidation = z
  .object({
    FirstName: z.string().min(1, "First Name is Required"),
    LastName: z.string().min(1, "Last Name is Required"),
    Email: z.string().email("Invalid Email"),
    Password: z.string().min(4, "Password must be at least 4 characters"),
    ConfirmPassword: z.string().min(1, "Please confirm your password"),
  })
  .refine((data) => data.Password === data.ConfirmPassword, {
    message: "Passwords do not match",
    path: ["ConfirmPassword"],
  });

interface signUpFormProps {
  isOpen: boolean;
  onClose: () => void;
}
const SignUp: React.FC<signUpFormProps> = ({ isOpen, onClose }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showOTPForm, setShowOTPForm] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: zodResolver(dataValidation),
  });
  useEffect(() => {
    if (isOpen) {
      reset();
    }
  }, [isOpen, reset]);

  const onSubmit = async (data: any) => {
    setLoading(true);
    try {
      const response = await fetch("/api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      if (response.ok) {
        // await signIn("credentials", {
        //   email: data.Email,
        //   password: data.Password,
        //   redirect: false,
        // });
        // Swal.fire("Success", "User successfully created", "success");
        setShowOTPForm(true);
        onClose();
      } else {
        const errorData = await response.json();
        Swal.fire({
          icon: "error",
          title: "Failed",
          text: errorData.message,
        });
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: `An error occurred: ${error}`,
      });
    }
    setLoading(false);
  };
  const handleOTPSubmit = (otp: string) => {
    console.log("OTP submitted:", otp);
    onClose();
  };

  const handleShowPassword = () => {
    setShowPassword((show) => !show);
  };
  return (
    <>
      <Modal
        isOpen={isOpen}
        onRequestClose={onClose}
        className="modal w-96 mx-auto"
        overlayClassName="modal-overlay"
        ariaHideApp={false}
      >
        <Box className="bg-white rounded-lg shadow-lg p-6">
          <Typography variant="h5" className="mb-2">
            {showOTPForm ? "Verify OTP" : "Sign Up"}
          </Typography>
          {showOTPForm ? (
            <OtpForm onSubmit={handleOTPSubmit} />
          ) : (
            <form onSubmit={handleSubmit(onSubmit)}>
              <TextField
                label="First Name"
                {...register("FirstName")}
                error={Boolean(errors.FirstName)}
                helperText={`${errors.FirstName?.message || ''}`}
                required
                className="mb-2"
                fullWidth
              />
              <TextField
                label="Last Name"
                {...register("LastName")}
                error={Boolean(errors.LastName)}
                helperText={`${errors.FirstName?.message || ''}`}
                required
                className="mb-2"
                fullWidth
              />
              <TextField
                label="Email"
                type="email"
                {...register("Email")}
                error={Boolean(errors.Email)}
                helperText={`${errors.FirstName?.message || ''}`}
                required
                className="mb-2"
                fullWidth
              />
              <TextField
                label="Password"
                type={showPassword ? "text" : "password"}
                {...register("Password")}
                error={Boolean(errors.Password)}
                helperText={`${errors.FirstName?.message || ''}`}
                required
                className="mb-2"
                fullWidth
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleShowPassword}
                        edge="end"
                      >
                        {showPassword ? <Visibility /> : <VisibilityOff />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
              <TextField
                label="Confirm Password"
                type="password"
                {...register("ConfirmPassword")}
                error={Boolean(errors.ConfirmPassword)}
                helperText={`${errors.FirstName?.message || ''}`}
                required
                className="mb-2"
                fullWidth
              />
              <Button
                type="submit"
                variant="contained"
                color="primary"
                className="mt-2 w-full"
                disabled={loading}
              >
                {loading ? <CircularProgress size={24} /> : "Sign Up"}
              </Button>
            </form>
          )}
          <Divider className="mb-4 relative">
            <span className="bg-white px-2 absolute left-1/2 -translate-x-1/2">
              or
            </span>
          </Divider>
          <Box className="flex justify-around mb-2">
            <Button
              variant="contained"
              color="primary"
              startIcon={<GoogleIcon />}
              // onClick={() => handleSocialSignup("Google")}
              className="mr-2 rounded-full"
              style={{ backgroundColor: "#DB4437" }}
            >
              Google
            </Button>
            <Button
              variant="contained"
              color="primary"
              startIcon={<FacebookIcon />}
              // onClick={() => handleSocialSignup("Facebook")}
              className="mr-2 rounded-full"
              style={{ backgroundColor: "#3B5998" }}
            >
              Facebook
            </Button>
          </Box>
          <Box className="flex justify-around mb-2">
            <Button
              variant="contained"
              color="primary"
              startIcon={<LinkedInIcon />}
              // onClick={() => handleSocialSignup("LinkedIn")}
              className="mr-2 rounded-full"
              style={{ backgroundColor: "#0A66C2" }}
            >
              LinkedIn
            </Button>
            <Button
              variant="contained"
              color="primary"
              startIcon={<GitHubIcon />}
              // onClick={() => handleSocialSignup("GitHub")}
              className="rounded-full"
              style={{ backgroundColor: "#24292E" }}
            >
              GitHub
            </Button>
          </Box>
        </Box>
      </Modal>
    </>
  );
};
export default SignUp;
