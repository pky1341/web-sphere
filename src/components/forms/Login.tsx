import React, { useState } from "react";
import { signIn } from "next-auth/react";
import Swal from "sweetalert2";
import {
    Dialog,
    DialogContent,
    DialogTitle,
    TextField,
    Button,
} from "@mui/material";
interface LoginProps {
    isOpen: boolean;
    onClose: () => void;
}
const Login: React.FC<LoginProps> = ({ isOpen, onClose }) => {
    const [isLoading, setIsLoading] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const handleLogin = async (event: React.FormEvent<HTMLFormElement>) => {
        setIsLoading(true);
        event.preventDefault();
        try {
            const response = await signIn("credentials", {
                email,
                password,
                redirect: false,
            });
            if (response?.ok) {
                Swal.fire({
                    title: "Success!",
                    text: "You have logged in successfully.",
                    icon: "success",
                    confirmButtonText: "OK",
                }).then(() => {
                    setIsLoading(false);
                    onClose();
                    window.location.reload();
                });
            } else {
                setIsLoading(false);
                Swal.fire({
                    title: "Error!",
                    text: response?.error || "Login failed. Please try again.",
                    icon: "error",
                    confirmButtonText: "OK",
                });
            }
        } catch (error) {
            setIsLoading(false);
            Swal.fire({
                title: "Error!",
                text: "An unexpected error occurred. Please try again.",
                icon: "error",
                confirmButtonText: "OK",
            });
        }
    };
    return (
        <>
            <Dialog open={isOpen} onClose={onClose}>
                <form
                    onSubmit={handleLogin}
                    className="flex flex-col items-center justify-center"
                >
                    <DialogTitle className="text-2xl font-bold mb-4">Login</DialogTitle>
                    <DialogContent className="flex flex-col space-y-4">
                        {isLoading && (
                            <div className="flex justify-center mb-4">
                                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
                            </div>
                        )}
                        <TextField
                            label="Email"
                            type="email"
                            variant="outlined"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full"
                            required
                        />
                        <TextField
                            label="Password"
                            type="password"
                            variant="outlined"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full"
                            required
                        />
                        <Button
                            type="submit"
                            variant="contained"
                            color="primary"
                            disabled={isLoading}
                            className="bg-primary text-white px-4 py-2 rounded"
                        >
                            Login
                        </Button>
                    </DialogContent>
                </form>
            </Dialog>
        </>
    );
};

export default Login;
