import { useContext, useState } from "react";
import { PocketBaseContext } from "../contexts/PocketBaseContext";
import { Navigate } from "react-router-dom";
import EyeSvg from "../img/eye.svg";
import EyeSlashSvg from "../img/eye-slash.svg";

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
  const [passwordShow, setPasswordShow] = useState<boolean>(false);

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
        <div className="flex flex-col">
          <label className="text-left mb-2">Email</label>
          <input
            type="text"
            className="mb-2 p-2"
            name="username"
            onChange={(e) => setUsername(e.target.value)}
          />

          <label className="text-left mb-2">Password</label>
          <div className="flex">
            <input
              type={passwordShow ? "text" : "password"}
              className="p-2"
              name="password"
              autoComplete="on"
              onChange={(e) => setPassword(e.target.value)}
            />
            <button
              type="button"
              className="w-10 h-10 p-0 p-1.5 bg-[#3b3b3b]"
              onClick={() => setPasswordShow(!passwordShow)}
            >
              <img
                src={passwordShow ? EyeSlashSvg : EyeSvg}
                alt="Toggle password show button"
              />
            </button>
          </div>
          <div className="mt-6">
            <button type="submit">Log in</button>
            <button type="button" onClick={register}>
              Register
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
