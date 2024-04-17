import React, { useState } from "react";
import Modal from "react-modal";
import { Box, Button, TextField, Typography, Divider, CircularProgress } from "@mui/material";
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
import Swal from 'sweetalert2';

const dataValidation = z.object({
  FirstName: z.string().min(1, "First Name is Required"),
  LastName: z.string().min(1, "Last Name is Required"),
  Email: z.string().email("Invalid Email"),
  Password: z.string().min(8, "Password must be at least 8 characters").regex(/(?=.*[0-9])/, "Password must contain a number"),
  ConfirmPassword: z.string().min(1, "Please confirm your password"),
}).refine((data) => data.Password === data.ConfirmPassword, {
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
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(dataValidation),
  });
  const onSubmit = async (data: any) => {
    setLoading(true);
    if (data.Password !== data.ConfirmPassword) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Passwords do not match'
      });
      setLoading(false);
      return;
    }

    try {
      const response = await fetch("/api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      if (response.ok) {
        Swal.fire(
          'Success',
          'User successfully created',
          'success'
        )
        onClose();
      } else {
        const errorData = await response.json();
        Swal.fire({
          icon: 'error',
          title: 'Failed',
          text: `Failed to create user: ${errorData}`
        });
      }
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: `An error occurred: ${error}`
      });
    }
    setLoading(false);
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
            Sign Up
          </Typography>
          <form onSubmit={handleSubmit(onSubmit)}>
            <TextField
              label="First Name"
              {...register("FirstName")}
              error={Boolean(errors.FirstName)}
              helperText={errors.FirstName?.message}
              required
              className="mb-2"
              fullWidth
            />
            <TextField
              label="Last Name"
              {...register("LastName")}
              error={Boolean(errors.LastName)}
              helperText={errors.LastName?.message}
              required
              className="mb-2"
              fullWidth
            />
            <TextField
              label="Email"
              type="email"
              {...register("Email")}
              error={Boolean(errors.Email)}
              helperText={errors.Email?.message}
              required
              className="mb-2"
              fullWidth
            />
            <TextField
              label="Password"
              type={showPassword ? "text" : "password"}
              {...register("Password")}
              error={Boolean(errors.Password)}
              helperText={errors.Password?.message}
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
              helperText={errors.ConfirmPassword?.message}
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