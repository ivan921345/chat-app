import { Routes, Route, Navigate } from "react-router-dom";
import SharedLayout from "../SharedLayout";
import HomePage from "../../pages/Home";
import SignupPage from "../../pages/Signup";
import LoginPage from "../../pages/Login";
import SettingsPage from "../../pages/Settings";
import ProfilePage from "../../pages/Profile";

import useStore from "../../zustand/useStore";
import { useEffect } from "react";

import notiflix from "notiflix";
notiflix.Notify.init({
  clickToClose: true,
  width: "300px",
  cssAnimation: "zoom",
});

const App = () => {
  const { authUser, checkAuth, isCheckingAuth } = useStore();
  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  console.log(authUser);

  if (isCheckingAuth && !authUser) {
    return (
      <div className="flex items-center justify-center h-screen">
        <span className="loading loading-ring loading-xl"></span>
      </div>
    );
  }
  console.log(authUser);

  return (
    <div>
      <SharedLayout />

      <Routes>
        <Route
          path="/"
          element={authUser ? <HomePage /> : <Navigate to="/login" />}
        />
        <Route
          path="/signup"
          element={!authUser ? <SignupPage /> : <Navigate to="/" />}
        />
        <Route
          path="/login"
          element={!authUser ? <LoginPage /> : <Navigate to="/" />}
        />
        <Route
          path="/settings"
          element={authUser ? <SettingsPage /> : <Navigate to="/login" />}
        />
        <Route
          path="/profile"
          element={authUser ? <ProfilePage /> : <Navigate to="/login" />}
        />
      </Routes>
    </div>
  );
};

export default App;
