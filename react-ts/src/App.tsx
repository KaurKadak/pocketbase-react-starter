import { useState } from "react";
import "./App.css";
import PocketBase from "pocketbase";

function App() {
  const pb = new PocketBase("http://127.0.0.1:8090");

  const [loggedIn, setLoggedIn] = useState<boolean>(false);

  const [errorMessage, setErrorMessage] = useState<string>("");

  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const login = async () => {
    try {
      await pb.collection("users").authWithPassword(username, password);
      setErrorMessage("");
      setLoggedIn(true);
    } catch (error) {
      setErrorMessage(
        "The email or password you have entered is incorrect. Please try again."
      );
    }
  };

  const logout = () => {
    pb.authStore.clear();
    setUsername("");
    setPassword("");
    setLoggedIn(false);
  };

  return (
    <>
      {loggedIn ? (
        <div>
          <div>Hello</div>
          <button onClick={logout} className="mt-6">
            Log out
          </button>
        </div>
      ) : (
        <div>
          <div className="mb-6 text-red-400">
            {errorMessage !== "" ? errorMessage : ""}
          </div>

          <form
            className="flex justify-center"
            onSubmit={(e) => {
              e.preventDefault();
              login();
            }}
          >
            <div className="flex flex-col max-w-60">
              <label className="text-left mb-2">Email</label>
              <input
                type="text"
                className="mb-2 p-2"
                name="username"
                onChange={(e) => setUsername(e.target.value)}
              />
              <label className="text-left mb-2">Password</label>
              <input
                type="text"
                className="p-2"
                name="password"
                onChange={(e) => setPassword(e.target.value)}
              />
              <div className="mt-6">
                <button type="submit">Log in</button>
              </div>
            </div>
          </form>
        </div>
      )}
    </>
  );
}

export default App;
