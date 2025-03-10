import { useState } from "react";
import useStore from "../zustand/useStore";
import AuthImagePattern from "../components/AuthImagePattern";
import { Eye, EyeClosed, MessageSquare } from "lucide-react";
import { Link, Navigate } from "react-router-dom";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { isLogingIn, login } = useStore();
  const [isShowingPassword, setIsShowingPassword] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    login({ password, email });
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
            <label className="input w-[100%]">
              <svg
                className="h-[1em] opacity-50"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
              >
                <g
                  strokeLinejoin="round"
                  strokeLinecap="round"
                  strokeWidth="2.5"
                  fill="none"
                  stroke="currentColor"
                >
                  <rect width="20" height="16" x="2" y="4" rx="2"></rect>
                  <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path>
                </g>
              </svg>
              <input
                type="email"
                placeholder="mail@site.com"
                required
                onChange={(e) => {
                  setEmail(e.currentTarget.value);
                }}
                value={email}
              />
            </label>
            {/* Pasword imput */}
            <label className="input w-[100%] relative">
              <svg
                className="h-[1em] opacity-50"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
              >
                <g
                  strokeLinejoin="round"
                  strokeLinecap="round"
                  strokeWidth="2.5"
                  fill="none"
                  stroke="currentColor"
                >
                  <path d="M2.586 17.414A2 2 0 0 0 2 18.828V21a1 1 0 0 0 1 1h3a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h1a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h.172a2 2 0 0 0 1.414-.586l.814-.814a6.5 6.5 0 1 0-4-4z"></path>
                  <circle
                    cx="16.5"
                    cy="7.5"
                    r=".5"
                    fill="currentColor"
                  ></circle>
                </g>
              </svg>
              <input
                type={isShowingPassword ? "text" : "password"}
                required
                placeholder="Password"
                minLength="8"
                pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
                value={password}
                title="Must be more than 8 characters, including number, lowercase letter, uppercase letter"
              />
              <button
                type="button"
                className="absolute inset-y-0 right-0 pr-3 flex items-center"
                onClick={() => {
                  setIsShowingPassword(() => !isShowingPassword);
                }}
              >
                {isShowingPassword ? (
                  <Eye className="size-5  text-base-content/40 hover: cursor-pointer " />
                ) : (
                  <EyeClosed className="size-5 text-base-content/40 hover: cursor-pointer" />
                )}
              </button>
            </label>
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
