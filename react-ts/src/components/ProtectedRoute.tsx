import { useContext } from "react";
import { PocketBaseContext } from "../contexts/PocketBaseContext";
import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children }: any) {
  const pb = useContext(PocketBaseContext);

  if (!pb.authStore.isValid) {
    return <Navigate to="/login" replace />;
  }

  return children;
}
