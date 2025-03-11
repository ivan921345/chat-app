import { useState } from "react";
import useStore from "../zustand/useStore";
import { Eye, EyeClosed, MessageSquare } from "lucide-react";
import { Link, useBeforeUnload } from "react-router-dom";
import AuthImagePattern from "../components/AuthImagePattern";
import UsernameInput from "../ui/UsernameInput";
import PasswordInput from "../ui/PasswordInput";
import EmailInput from "../ui/EmailInput";

const SignupPage = () => {
  const { signup, isSigningUp } = useStore();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const handleSubmit = (e) => {
    e.preventDefault();

    signup({ fullName: username, password, email });
  };
  const handleInpChange = (e) => {
    if (e.target.name === "password") {
      setPassword(e.target.value);
      console.log(password);
    }
    if (e.target.name === "email") {
      setEmail(e.target.value);
      console.log(email);
    }
    if (e.target.name === "username") {
      setUsername(e.target.value);
      console.log(username);
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
              <h1 className="text-2xl font-bold mt-2">Create an account</h1>
              <p className="text-base-content/60">
                Get started with your free account
              </p>
            </div>
          </div>
          <form
            onSubmit={handleSubmit}
            className="flex-col justify-center items-center space-y-6"
          >
            {/* Username input */}
            <UsernameInput onChange={handleInpChange} value={username} />
            {/* Email input */}
            <EmailInput onChange={handleInpChange} value={email} />
            {/* Pasword imput */}
            <PasswordInput onChange={handleInpChange} value={password} />
            <button
              type="submit"
              className="btn btn-outline btn-success btn-block"
            >
              {isSigningUp ? (
                <span className="loading loading-ring loading-xl"></span>
              ) : (
                "Sign up"
              )}
            </button>
          </form>
          <div className="text-center">
            <p className="text-base/60">
              Already have an account?{" "}
              <Link to="/login" className="link link-primary">
                Sign In
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

export default SignupPage;
