import { useState } from "react";
import "./App.css";
import PocketBase from "pocketbase";
import { TypedPocketBase } from "./pocketbase-types";
import MainPage from "./components/MainPage";
import AuthPage from "./components/AuthPage";
import { PocketBaseContext } from "./contexts/PocketBaseContext";
import { Routes, Route, useNavigate } from "react-router-dom";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  const pb = new PocketBase("http://127.0.0.1:8090") as TypedPocketBase;

  const [errorMessage, setErrorMessage] = useState<string>("");

  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const [name, setName] = useState<string>("");

  const navigate = useNavigate();

  const login = async () => {
    try {
      var response = await pb
        .collection("users")
        .authWithPassword(username, password);
      setErrorMessage("");
      setName(
        response.record.name != ""
          ? response.record.name
          : response.record.email
      );
      navigate("/");
    } catch (error) {
      setErrorMessage("The email or password you have entered is incorrect.");
    }
  };

  async function register() {
    try {
      const newUser = {
        email: username,
        password: password,
        passwordConfirm: password,
      };

      await pb.collection("users").create(newUser);
      console.log("test");
      await login();
    } catch (error) {
      setErrorMessage(
        "The email already exists or your password is shorter then 8 characters."
      );
    }
  }

  const logout = () => {
    pb.authStore.clear();
    setUsername("");
    setPassword("");
    setName("");
    navigate("/login");
  };

  return (
    <PocketBaseContext.Provider value={pb}>
      <div className="text-4xl mb-12">PocketBase React starter</div>
      <Routes>
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <MainPage name={name} logout={logout} />
            </ProtectedRoute>
          }
        />
        ]
        <Route
          path="/login"
          element={
            <AuthPage
              errorMessage={errorMessage}
              login={login}
              register={register}
              setUsername={setUsername}
              setPassword={setPassword}
            />
          }
        />
      </Routes>
    </PocketBaseContext.Provider>
  );
}

export default App;
