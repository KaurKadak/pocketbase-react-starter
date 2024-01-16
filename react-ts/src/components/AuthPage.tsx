import { useContext } from "react";
import { PocketBaseContext } from "../contexts/PocketBaseContext";
import { Navigate } from "react-router-dom";

interface AuthPageProps {
  errorMessage: String;
  login: () => Promise<void>;
  register: () => Promise<void>;
  setUsername: React.Dispatch<React.SetStateAction<string>>;
  setPassword: React.Dispatch<React.SetStateAction<string>>;
}

export default function AuthPage({
  errorMessage,
  login,
  register,
  setUsername,
  setPassword,
}: AuthPageProps) {
  const pb = useContext(PocketBaseContext);

  if (pb.authStore.isValid) {
    return <Navigate to="/" replace />;
  }

  return (
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
  );
}
