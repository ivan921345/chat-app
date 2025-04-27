import { useState } from "react";
import useStore from "../zustand/useStore";
import AuthImagePattern from "../components/AuthImagePattern";
import { Eye, EyeClosed, MessageSquare } from "lucide-react";
import { Link, Navigate } from "react-router-dom";
import EmailInput from "../ui/EmailInput";
import PasswordInput from "../ui/PasswordInput";

const LoginPage = () => {
  const [email, setEmail] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("login email")) || "";
    } catch (error) {
      console.log(error);
      return "";
    }
  });
  const [password, setPassword] = useState("");
  const isLogingIn = useStore((state) => state.isLogingIn);

  const login = useStore((state) => state.login);

  const handleSubmit = (e) => {
    e.preventDefault();
    login({ password, email });
  };
  const handleInpChange = (e) => {
    if (e.target.name === "password") {
      setPassword(e.target.value);
    }
    if (e.target.name === "email") {
      setEmail(e.target.value);
      localStorage.setItem(
        `login ${e.target.name}`,
        JSON.stringify(e.target.value)
      );

      console.log();
    }
  };

  return (
    <div className="min-h-screen grid lg:grid-cols-2">
      <div className="flex justify-center items-center p-6 sm:p-12">
        <div className="w-full max-w-md space-y-8">
          {/* logo */}
          <div className="text-center mb-8">
            <div className="flex flex-col items-center gap-2 group">
              <div className="size-12 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                <MessageSquare className="size-6 text-primary" />
              </div>
              <h1 className="text-2xl font-bold mt-2">Log In</h1>
            </div>
          </div>
          <form
            onSubmit={handleSubmit}
            className="flex-col justify-center items-center space-y-6"
          >
            {/* Email input */}
            <EmailInput onChange={handleInpChange} value={email} />
            {/* Pasword imput */}

            <PasswordInput onChange={handleInpChange} value={password} />

            <button
              type="submit"
              className="btn btn-outline btn-success btn-block"
            >
              {isLogingIn ? (
                <span className="loading loading-ring loading-xl"></span>
              ) : (
                "Log In"
              )}
            </button>
          </form>
          <div className="text-center">
            <p className="text-base/60">
              Dont have an account?{" "}
              <Link to="/signup" className="link link-primary">
                Sign Up
              </Link>
            </p>
          </div>
        </div>
      </div>
      <AuthImagePattern
        title="Join our community"
        subtitle="Connect with friends, share moments, and stay in touch with your loved ones."
      />
    </div>
  );
};

export default LoginPage;
