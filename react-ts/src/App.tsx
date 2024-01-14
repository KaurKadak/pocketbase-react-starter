import { useState } from "react";
import "./App.css";
import PocketBase from "pocketbase";
import { TypedPocketBase } from "./pocketbase-types";

function App() {
  const pb = new PocketBase("http://127.0.0.1:8090") as TypedPocketBase;

  const [loggedIn, setLoggedIn] = useState<boolean>(false);

  const [errorMessage, setErrorMessage] = useState<string>("");

  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const [user, setUser] = useState<string>();

  const login = async () => {
    try {
      var response = await pb
        .collection("users")
        .authWithPassword(username, password);
      setErrorMessage("");
      setUser(
        response.record.name != ""
          ? response.record.name
          : response.record.email
      );
      console.log(response.record);
      setLoggedIn(true);
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

      const createdUser = await pb.collection("users").create(newUser);
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
    setUser("");
    setLoggedIn(false);
  };

  return (
    <>
      <div className="text-4xl mb-12">PocketBase React starter</div>

      {loggedIn ? (
        <div>
          <div>Hello {user ? user : <></>}</div>
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
          <button onClick={register}>Register</button>
        </div>
      )}
    </>
  );
}

export default App;
