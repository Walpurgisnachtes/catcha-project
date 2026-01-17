// App.js
import { StatusBar } from "expo-status-bar";
import { useState } from "react";
import Login from "./js/login";
import Lobby from "./js/lobby";

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogin = () => setIsLoggedIn(true);
  const handleLogout = () => setIsLoggedIn(false);

  return (
    <>
      {isLoggedIn ? (
        <Lobby onLogout={handleLogout} />
      ) : (
        <Login onLogin={handleLogin} />
      )}
      <StatusBar style="auto" />
    </>
  );
}