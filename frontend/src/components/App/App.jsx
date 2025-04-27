import { Routes, Route, Navigate } from "react-router-dom";
import SharedLayout from "../SharedLayout";
import HomePage from "../../pages/Home";
import SignupPage from "../../pages/Signup";
import LoginPage from "../../pages/Login";
import SettingsPage from "../../pages/Settings";
import ProfilePage from "../../pages/Profile";
import FriendsPage from "../../pages/Friends";
import SearchFriendsPage from "../../pages/SearchFriends";
import useStore from "../../zustand/useStore";
import { useEffect } from "react";

import notiflix from "notiflix";
import useThemeStore from "../../zustand/useThemeStore";
notiflix.Notify.init({
  clickToClose: true,
  width: "300px",
  cssAnimation: "zoom",
});

const App = () => {
  const authUser = useStore((state) => state.authUser);
  const checkAuth = useStore((state) => state.checkAuth);
  const isCheckingAuth = useStore((state) => state.isCheckingAuth);

  // const { theme } = useThemeStore();

  const theme = useThemeStore((state) => state.theme);

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  if (isCheckingAuth && !authUser) {
    return (
      <div className="flex items-center justify-center h-screen">
        <span className="loading loading-ring loading-xl"></span>
      </div>
    );
  }

  return (
    <div data-theme={theme}>
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
        <Route path="/friends">
          <Route
            index
            element={authUser ? <FriendsPage /> : <Navigate to="/login" />}
          />
          <Route
            path="search"
            element={
              authUser ? <SearchFriendsPage /> : <Navigate to="/login" />
            }
          />
        </Route>
      </Routes>
    </div>
  );
};

export default App;
