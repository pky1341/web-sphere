import React, { useState } from "react";
import Modal from "react-modal";
import { Box, Button, TextField, Typography, Divider } from "@mui/material";
import GoogleIcon from "@mui/icons-material/Google";
import FacebookIcon from "@mui/icons-material/Facebook";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import GitHubIcon from "@mui/icons-material/GitHub";

interface signUpFormProps {
  isOpen: boolean;
  onClose: () => void;
}
const SignUp: React.FC<signUpFormProps> = ({ isOpen, onClose }) => {
  // console.log(isOpen);
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
          <form>
            <TextField
              label="First Name"
              name="name"
              // value={formData.name}
              // onChange={handleChange}
              required
              className="mb-2"
              fullWidth
            />
            <TextField
              label="last Name"
              name="name"
              // value={formData.name}
              // onChange={handleChange}
              required
              className="mb-2"
              fullWidth
            />
            <TextField
              label="Email"
              name="email"
              type="email"
              // value={formData.email}
              // onChange={handleChange}
              required
              className="mb-2"
              fullWidth
            />
            <TextField
              label="Password"
              name="password"
              type="password"
              // value={formData.password}
              // onChange={handleChange}
              required
              className="mb-2"
              fullWidth
            />
            <TextField
              label="confirm Password"
              name="confirm password"
              type="password"
              // value={formData.password}
              // onChange={handleChange}
              required
              className="mb-2"
              fullWidth
            />
            <Button
              type="submit"
              variant="contained"
              color="primary"
              className="mt-2 w-full"
            >
              Sign Up
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
